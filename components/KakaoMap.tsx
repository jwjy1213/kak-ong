'use client'

import { useEffect, useRef } from 'react'
import { Cafe, REGION_COORDS } from '@/types'

interface Props {
  cafes: Cafe[]
  region: string
  onMarkerClick?: (cafe: Cafe) => void
}

const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAPS_KEY

function loadKakaoScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.kakao?.maps) {
      resolve()
      return
    }
    const existing = document.getElementById('kakao-maps-sdk')
    if (existing) {
      existing.addEventListener('load', () => resolve())
      return
    }
    const script = document.createElement('script')
    script.id = 'kakao-maps-sdk'
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('카카오 지도 스크립트 로드 실패'))
    document.head.appendChild(script)
  })
}

export default function KakaoMap({ cafes, region, onMarkerClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !apiKey) return

    loadKakaoScript()
      .then(() => {
        window.kakao.maps.load(() => {
          if (!containerRef.current) return
          const center = REGION_COORDS[region] ?? { lat: 37.5665, lng: 126.9780 }
          const map = new window.kakao.maps.Map(containerRef.current, {
            center: new window.kakao.maps.LatLng(center.lat, center.lng),
            level: 4,
          })

          cafes.forEach((cafe) => {
            const position = new window.kakao.maps.LatLng(cafe.lat, cafe.lng)
            const marker = new window.kakao.maps.Marker({ position, map })
            const infoWindow = new window.kakao.maps.InfoWindow({
              content: `<div style="padding:6px 10px;font-size:13px;font-weight:700;">${cafe.name}</div>`,
            })
            window.kakao.maps.event.addListener(marker, 'click', () => {
              infoWindow.open(map, marker)
              onMarkerClick?.(cafe)
            })
          })
        })
      })
      .catch((e) => console.error(e))
  }, [cafes, region, onMarkerClick])

  if (!apiKey) {
    return (
      <div className="w-full h-full bg-[#f4f4f4] flex flex-col items-center justify-center gap-2 text-center px-6">
        <p className="text-sm font-bold">카카오 지도 API 키를 설정해주세요</p>
      </div>
    )
  }

  return <div ref={containerRef} className="w-full h-full" />
}
