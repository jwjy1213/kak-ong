'use client'

import { useEffect, useRef, useState } from 'react'
import { Cafe, REGION_COORDS } from '@/types'

interface Props {
  cafes: Cafe[]
  region: string
  focusedCafe?: Cafe | null
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
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('카카오 지도 스크립트 로드 실패'))
    document.head.appendChild(script)
  })
}

export default function KakaoMap({ cafes, region, focusedCafe, onMarkerClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!containerRef.current || !apiKey) {
      setStatus('error')
      setErrorMsg('API 키 없음')
      return
    }

    loadKakaoScript()
      .then(() => {
        window.kakao.maps.load(() => {
          if (!containerRef.current) return
          try {
            const center = REGION_COORDS[region] ?? { lat: 37.5665, lng: 126.9780 }
            const map = new window.kakao.maps.Map(containerRef.current, {
              center: new window.kakao.maps.LatLng(center.lat, center.lng),
              level: 4,
            })
            mapRef.current = map
            setStatus('ok')

            const bounds = new window.kakao.maps.LatLngBounds()
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
              bounds.extend(position)
            })
            if (cafes.length > 0) map.setBounds(bounds)
          } catch (e) {
            setStatus('error')
            setErrorMsg(String(e))
          }
        })
      })
      .catch((e) => {
        setStatus('error')
        setErrorMsg(String(e))
      })
  }, [cafes, region, onMarkerClick])

  useEffect(() => {
    if (!mapRef.current) return
    if (!focusedCafe) {
      mapRef.current.setLevel(4)
      return
    }
    const position = new window.kakao.maps.LatLng(focusedCafe.lat, focusedCafe.lng)
    mapRef.current.setLevel(2)
    mapRef.current.panTo(position)
  }, [focusedCafe])

  if (!apiKey) {
    return (
      <div className="w-full h-full bg-[#f4f4f4] flex items-center justify-center">
        <p className="text-sm font-bold">카카오 지도 API 키를 설정해주세요</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      {status === 'loading' && (
        <div className="absolute inset-0 bg-[#f4f4f4] flex items-center justify-center">
          <p className="text-sm font-bold text-[#a3a3a3]">지도 로딩 중...</p>
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 bg-[#f4f4f4] flex flex-col items-center justify-center gap-2 px-6 text-center">
          <p className="text-sm font-bold">지도를 불러올 수 없어요</p>
          <p className="text-xs text-[#a3a3a3] break-all">{errorMsg}</p>
        </div>
      )}
    </div>
  )
}
