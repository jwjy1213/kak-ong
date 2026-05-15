'use client'

import { motion } from 'framer-motion'
import { Cafe, FILTERS, FilterKey } from '@/types'
import KakaoMap from './KakaoMap'
import CafeCard from './CafeCard'

interface Props {
  cafes: Cafe[]
  location: string
  activeFilters: Set<string>
  onBack: () => void
  onToggleFilter: (filter: FilterKey) => void
}

export default function MainScreen({ cafes, location, activeFilters, onBack, onToggleFilter }: Props) {
  return (
    <div className="flex flex-col bg-white overflow-hidden" style={{ height: '100dvh' }}>
      {/* 헤더 */}
      <motion.div
        className="flex-shrink-0 px-6 pt-14 pb-4"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 24 }}
      >
        <motion.button
          onClick={onBack}
          className="text-black text-sm mb-6 flex items-center gap-1"
          style={{ fontWeight: 600 }}
          whileTap={{ scale: 0.92 }}
        >
          ← 다시 찾기
        </motion.button>
        <div>
          <p className="text-black leading-tight" style={{ fontSize: 32, fontWeight: 700, fontFamily: 'var(--font-yang)' }}>
            {location}에서
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-black" style={{ fontSize: 32, fontWeight: 700, fontFamily: 'var(--font-yang)' }}>
              칵옹하기
            </p>
            <p style={{ fontSize: 20, fontWeight: 500 }}>
              =^•ﻌ•^=
            </p>
          </div>
        </div>
      </motion.div>

      {/* 지도 — 고정 높이 */}
      <div className="flex-shrink-0" style={{ height: 220 }}>
        <KakaoMap cafes={cafes} region={location} />
      </div>

      {/* 리스트 영역 — 나머지 전부 채움 */}
      <div className="flex flex-col flex-1 overflow-hidden bg-white">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-6 pt-4 pb-3 flex-shrink-0">
          {FILTERS.map((f) => {
            const active = activeFilters.has(f)
            return (
              <motion.button
                key={f}
                onClick={() => onToggleFilter(f as FilterKey)}
                className="flex-shrink-0"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  height: 37,
                  borderRadius: 999,
                  padding: '0 14px',
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  backgroundColor: active ? '#000000' : '#f4f4f4',
                  color: active ? '#ffffff' : '#a3a3a3',
                }}
                whileTap={{ scale: 0.93 }}
              >
                {f}
              </motion.button>
            )
          })}
        </div>

        <div className="border-t border-[#f4f4f4] mx-6 flex-shrink-0" />

        <div className="overflow-y-auto scrollbar-hide flex-1 px-6 pb-8">
          {cafes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32">
              <p className="text-[#a3a3a3] font-bold text-lg">조건에 맞는 카페가 없어요</p>
              <p className="text-[#a3a3a3] text-sm mt-1">필터를 줄여보세요</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-[#f4f4f4]">
              {cafes.map((cafe, i) => (
                <CafeCard key={cafe.id} cafe={cafe} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
