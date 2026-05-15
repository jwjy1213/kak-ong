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
    <motion.a
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-4 py-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 24, delay: index * 0.09 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="flex-shrink-0 bg-[#d6d6d6]"
        style={{ width: 100, height: 100, borderRadius: 10 }}
      />

      <div className="flex flex-col justify-center min-w-0">
        <p className="text-black truncate" style={{ fontSize: 24, fontWeight: 700, fontFamily: 'var(--font-yang)' }}>
          {cafe.name}
        </p>
        <p className="text-black truncate" style={{ fontSize: 14, fontWeight: 700, marginTop: -3 }}>
          {cafe.address}
        </p>
        {cafe.memo && (
          <p className="text-[#a3a3a3] text-xs mt-1 line-clamp-2">{cafe.memo}</p>
        )}
      </div>
    </motion.a>
  )
}
