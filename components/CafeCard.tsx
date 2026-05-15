'use client'

import { Cafe } from '@/types'

interface Props {
  cafe: Cafe
}

export default function CafeCard({ cafe }: Props) {
  const mapUrl = cafe.kakao_url ?? `https://map.kakao.com/link/map/${encodeURIComponent(cafe.name)},${cafe.lat},${cafe.lng}`

  return (
    <a
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-4 py-4 active:opacity-70"
    >
      <div
        className="flex-shrink-0 bg-[#d6d6d6]"
        style={{ width: 100, height: 100, borderRadius: 10 }}
      />

      <div className="flex flex-col justify-center min-w-0">
        <p className="text-black truncate" style={{ fontSize: 24, fontWeight: 700 }}>
          {cafe.name}
        </p>
        <p className="text-black truncate mt-1" style={{ fontSize: 14, fontWeight: 700 }}>
          {cafe.address}
        </p>
        {cafe.memo && (
          <p className="text-[#a3a3a3] text-xs mt-1 line-clamp-2">{cafe.memo}</p>
        )}
      </div>
    </a>
  )
}
