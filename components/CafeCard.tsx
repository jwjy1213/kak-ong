'use client'

import { motion } from 'framer-motion'
import { Cafe } from '@/types'

interface Props {
  cafe: Cafe
  index?: number
  selected?: boolean
  onSelect?: () => void
}

function openDeepLink(appScheme: string, webUrl: string) {
  const timer = setTimeout(() => {
    window.location.href = webUrl
  }, 1500)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearTimeout(timer)
  }, { once: true })
  window.location.href = appScheme
}

export default function CafeCard({ cafe, index = 0, selected = false, onSelect }: Props) {
  const kakaoAppUrl = `kakaomap://open?placeName=${encodeURIComponent(cafe.name)}&lat=${cafe.lat}&lng=${cafe.lng}`
  const kakaoWebUrl = cafe.kakao_url ?? `https://map.kakao.com/link/map/${encodeURIComponent(cafe.name)},${cafe.lat},${cafe.lng}`

  const naverAppUrl = `nmap://place?lat=${cafe.lat}&lng=${cafe.lng}&name=${encodeURIComponent(cafe.name)}&appname=kak-ong`
  const naverWebUrl = cafe.naver_url ?? `https://map.naver.com/v5/search/${encodeURIComponent(cafe.name)}`

  return (
    <motion.div
      className="py-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 24, delay: index * 0.09 }}
      onClick={onSelect}
      onTouchStart={(e) => e.stopPropagation()}
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
        <motion.div
          className="flex gap-2 mt-3"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button
            className="inline-flex items-center px-4 bg-white text-black text-sm"
            style={{ height: 36, borderRadius: 8, fontWeight: 700, border: '1px solid #000' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => openDeepLink(kakaoAppUrl, kakaoWebUrl)}
          >
            카카오맵
          </motion.button>
          <motion.button
            className="inline-flex items-center px-4 bg-white text-black text-sm"
            style={{ height: 36, borderRadius: 8, fontWeight: 700, border: '1px solid #000' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => openDeepLink(naverAppUrl, naverWebUrl)}
          >
            네이버지도
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}
