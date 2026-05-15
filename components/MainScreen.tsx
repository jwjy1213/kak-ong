'use client'

import { useRef, useState } from 'react'
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
  const [expanded, setExpanded] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!listRef.current) return
    setExpanded(listRef.current.scrollTop > 0)
  }

  return (
    <div className="flex flex-col overflow-hidden" style={{ height: '100dvh' }}>
      {/* 헤더 */}
      <motion.div
        className="flex-shrink-0 px-6 pt-14 pb-4 bg-white"
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

      {/* 지도 — 스크롤 시 height 0으로 접힘 */}
      <div
        className="flex-shrink-0 overflow-hidden"
        style={{
          height: expanded ? 0 : 200,
          transition: 'height 0.38s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        <div style={{ height: 200 }}>
          <KakaoMap cafes={cafes} region={location} />
        </div>
      </div>

      {/* 카드 — 지도가 접히면 자동으로 올라옴 */}
      <div
        className="flex flex-col flex-1 min-h-0 bg-white"
        style={{
          borderRadius: expanded ? '0' : '20px 20px 0 0',
          boxShadow: '0 -2px 16px rgba(0,0,0,0.08)',
          transition: 'border-radius 0.38s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        {/* 핸들 */}
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-[#d6d6d6]" />
        </div>

        {/* 필터 태그 */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-6 pt-1 pb-3 flex-shrink-0">
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

        {/* 카페 리스트 */}
        <div
          ref={listRef}
          onScroll={handleScroll}
          className="overflow-y-auto scrollbar-hide flex-1 min-h-0 px-6 pb-8"
        >
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
