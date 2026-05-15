'use client'

import { motion } from 'framer-motion'
import { Cafe } from '@/types'

interface Props {
  cafe: Cafe
  index?: number
  selected?: boolean
  onSelect?: () => void
}

export default function CafeCard({ cafe, index = 0, selected = false, onSelect }: Props) {
  const mapUrl = cafe.kakao_url ?? `https://map.kakao.com/link/map/${cafe.name},${cafe.lat},${cafe.lng}`

  return (
    <motion.div
      className="py-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 24, delay: index * 0.09 }}
      onClick={onSelect}
    >
      <p className="text-black" style={{ fontSize: 24, fontWeight: 700, fontFamily: 'var(--font-yang)' }}>
        {cafe.name}
      </p>
      <p className="text-black" style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>
        {cafe.address}
      </p>
      {cafe.hours && (
        <p className="text-[#a3a3a3] text-xs mt-1">{cafe.hours}</p>
      )}
      {selected && (
        <motion.a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center mt-3 px-4 bg-black text-white text-sm"
          style={{ height: 36, borderRadius: 8, fontWeight: 600 }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          whileTap={{ scale: 0.96 }}
          onClick={(e) => e.stopPropagation()}
        >
          지도로 보기
        </motion.a>
      )}
    </motion.div>
  )
}
