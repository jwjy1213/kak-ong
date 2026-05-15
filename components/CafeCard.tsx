'use client'

import { motion } from 'framer-motion'
import { Cafe } from '@/types'

interface Props {
  cafe: Cafe
  index?: number
}

export default function CafeCard({ cafe, index = 0 }: Props) {
  const mapUrl = cafe.kakao_url ?? `https://map.kakao.com/link/map/${encodeURIComponent(cafe.name)},${cafe.lat},${cafe.lng}`

  return (
    <motion.div
      className="py-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 24, delay: index * 0.09 }}
    >
      {/* 이름 + 주소 — 탭하면 카카오맵으로 */}
      <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="block active:opacity-60">
        <p className="text-black" style={{ fontSize: 24, fontWeight: 700, fontFamily: 'var(--font-yang)' }}>
          {cafe.name}
        </p>
        <p className="text-black" style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>
          {cafe.address}
        </p>
      </a>

      {/* 이미지 가로 스크롤 */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 bg-[#d6d6d6]"
            style={{ width: 64, height: 64, borderRadius: 10 }}
          />
        ))}
      </div>
    </motion.div>
  )
}
