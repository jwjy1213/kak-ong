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

const COLLAPSED = '50dvh'
const EXPANDED = '88dvh'
const SNAP_THRESHOLD = 0.65  // 65% 넘으면 expanded로 스냅

export default function MainScreen({ cafes, location, activeFilters, onBack, onToggleFilter }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const expandedRef = useRef(false)
  const dragRef = useRef<{ startY: number; startH: number } | null>(null)
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null)

  const snapTo = (expand: boolean) => {
    if (!cardRef.current) return
    expandedRef.current = expand
    cardRef.current.style.transition = 'height 0.35s cubic-bezier(0.32, 0.72, 0, 1)'
    cardRef.current.style.height = expand ? EXPANDED : COLLAPSED
  }

  const onDragStart = (clientY: number) => {
    if (!cardRef.current) return
    cardRef.current.style.transition = 'none'
    dragRef.current = {
      startY: clientY,
      startH: cardRef.current.getBoundingClientRect().height,
    }
  }

  const onDragMove = (clientY: number) => {
    if (!dragRef.current || !cardRef.current) return
    const delta = dragRef.current.startY - clientY  // 위로 드래그 = 양수
    const newH = Math.max(120, dragRef.current.startH + delta)
    cardRef.current.style.height = `${newH}px`
  }

  const onDragEnd = (clientY: number) => {
    if (!dragRef.current || !cardRef.current) return
    const delta = dragRef.current.startY - clientY  // 양수 = 위로, 음수 = 아래로
    const currentH = cardRef.current.getBoundingClientRect().height
    const vh = window.innerHeight

    let shouldExpand: boolean
    if (delta > 40) {
      shouldExpand = true   // 위로 40px 이상 → 펼치기
    } else if (delta < -40) {
      shouldExpand = false  // 아래로 40px 이상 → 닫기
    } else {
      // 작은 움직임: 두 스냅 포인트 중간값 기준으로 스냅
      shouldExpand = currentH > vh * SNAP_THRESHOLD
    }

    snapTo(shouldExpand)
    dragRef.current = null
  }

  const dragProps = {
    onTouchStart: (e: React.TouchEvent) => onDragStart(e.touches[0].clientY),
    onTouchMove: (e: React.TouchEvent) => onDragMove(e.touches[0].clientY),
    onTouchEnd: (e: React.TouchEvent) => onDragEnd(e.changedTouches[0].clientY),
  }

  return (
    <div className="relative overflow-hidden" style={{ height: '100dvh' }}>
      {/* 지도 — 전체 화면 */}
      <div className="absolute inset-0">
        <KakaoMap cafes={cafes} region={location} focusedCafe={selectedCafe} onMarkerClick={setSelectedCafe} />
      </div>

      {/* 헤더 — 지도 위 플로팅 */}
      <motion.div
        className="absolute top-0 left-0 right-0 px-6 pt-14 pb-4 bg-white"
        style={{ zIndex: 10 }}
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

      {/* 바텀시트 — 지도 위 플로팅, 드래그로 expand/collapse */}
      <div
        ref={cardRef}
        className="absolute bottom-0 left-0 right-0 bg-white flex flex-col overflow-hidden"
        style={{
          height: COLLAPSED,
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.10)',
          zIndex: 10,
        }}
      >
        {/* 핸들 — 드래그 영역 */}
        <div
          {...dragProps}
          className="flex justify-center pt-3 pb-4 flex-shrink-0"
          style={{ touchAction: 'none' }}
        >
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
          className="overflow-y-auto scrollbar-hide flex-1 px-6 pb-8"
          style={{ overscrollBehavior: 'contain' }}
        >
          {cafes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32">
              <p className="text-[#a3a3a3] font-bold text-lg">조건에 맞는 카페가 없어요</p>
              <p className="text-[#a3a3a3] text-sm mt-1">필터를 줄여보세요</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-[#f4f4f4]">
              {cafes.map((cafe, i) => (
                <CafeCard
                  key={cafe.id}
                  cafe={cafe}
                  index={i}
                  selected={selectedCafe?.id === cafe.id}
                  onSelect={() => setSelectedCafe(prev => prev?.id === cafe.id ? null : cafe)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
