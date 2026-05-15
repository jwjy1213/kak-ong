'use client'

import { useEffect, useRef } from 'react'
import { Cafe, REGION_COORDS } from '@/types'

interface Props {
  cafes: Cafe[]
  region: string
  onMarkerClick?: (cafe: Cafe) => void
}

export default function KakaoMap({ cafes, region, onMarkerClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAPS_KEY
    if (!apiKey) return

    const init = () => {
      window.kakao.maps.load(() => {
        const center = REGION_COORDS[region] ?? { lat: 37.5665, lng: 126.9780 }
        const latlng = new window.kakao.maps.LatLng(center.lat, center.lng)
        const map = new window.kakao.maps.Map(containerRef.current!, {
          center: latlng,
          level: 4,
        })

        cafes.forEach((cafe) => {
          const position = new window.kakao.maps.LatLng(cafe.lat, cafe.lng)
          const marker = new window.kakao.maps.Marker({ position, map })

          if (onMarkerClick) {
            window.kakao.maps.event.addListener(marker, 'click', () => {
              onMarkerClick(cafe)
            })
          }

          const infoWindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:6px 10px;font-size:13px;font-weight:600;color:#2C1810;">${cafe.name}</div>`,
          })
          window.kakao.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(map, marker)
          })
        })
      })
    }

    if (window.kakao?.maps) {
      init()
    } else {
      // Script not yet loaded — wait for it
      const interval = setInterval(() => {
        if (window.kakao?.maps) {
          clearInterval(interval)
          init()
        }
      }, 200)
      return () => clearInterval(interval)
    }
  }, [cafes, region, onMarkerClick])

  const hasKey = !!process.env.NEXT_PUBLIC_KAKAO_MAPS_KEY

  if (!hasKey) {
    return (
      <div className="w-full h-full bg-[#F0EBE3] flex flex-col items-center justify-center gap-2 text-center px-6">
        <span className="text-3xl">🗺️</span>
        <p className="text-[#8B6F5E] text-sm font-medium">카카오 지도 API 키를 설정해주세요</p>
        <p className="text-[#C8956C] text-xs">.env.local에 NEXT_PUBLIC_KAKAO_MAPS_KEY 추가</p>
      </div>
    )
  }

  return <div ref={containerRef} className="w-full h-full" />
}
