'use client'

import { useRef, useState, useEffect } from 'react'
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

const DEFAULT_H = 220   // 기본 높이
const EXPANDED = '88dvh'

type SheetState = 'filter' | 'default' | 'expanded'

export default function MainScreen({ cafes, location, activeFilters, onBack, onToggleFilter }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ startY: number; startH: number } | null>(null)
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null)
  const [sheetState, setSheetState] = useState<SheetState>('default')
  const [filterH, setFilterH] = useState(0)

  useEffect(() => {
    if (headerRef.current) {
      setFilterH(headerRef.current.getBoundingClientRect().height)
    }
  }, [])

  const snapTo = (state: SheetState) => {
    if (!cardRef.current) return
    const h = state === 'expanded' ? EXPANDED : state === 'default' ? `${DEFAULT_H}px` : `${filterH}px`
    setSheetState(state)
    cardRef.current.style.transition = 'height 0.35s cubic-bezier(0.32, 0.72, 0, 1)'
    cardRef.current.style.height = h
  }

  const onDragStart = (clientY: number) => {
    if (!cardRef.current) return
    cardRef.current.style.transition = 'none'
    dragRef.current = { startY: clientY, startH: cardRef.current.getBoundingClientRect().height }
  }

  const onDragMove = (clientY: number) => {
    if (!dragRef.current || !cardRef.current) return
    const delta = dragRef.current.startY - clientY
    const vh = window.innerHeight
    const minH = filterH || DEFAULT_H
    const maxH = vh * 0.88
    const newH = Math.min(maxH, Math.max(minH, dragRef.current.startH + delta))
    cardRef.current.style.height = `${newH}px`
  }

  const onDragEnd = (clientY: number) => {
    if (!dragRef.current) return
    const delta = dragRef.current.startY - clientY
    dragRef.current = null
    if (delta > 40) snapTo('expanded')
    else if (delta < -40) snapTo('filter')
    else snapTo(sheetState) // 작은 움직임: 현재 상태 유지
  }

  const dragProps = {
    onTouchStart: (e: React.TouchEvent) => onDragStart(e.touches[0].clientY),
    onTouchMove: (e: React.TouchEvent) => onDragMove(e.touches[0].clientY),
    onTouchEnd: (e: React.TouchEvent) => onDragEnd(e.changedTouches[0].clientY),
  }

  return (
    <div className="relative overflow-hidden" style={{ height: '100dvh' }} onClick={() => snapTo('default')}>
      <div className="absolute inset-0">
        <KakaoMap cafes={cafes} region={location} focusedCafe={selectedCafe} onMarkerClick={setSelectedCafe} />
      </div>

      <motion.div
        className="absolute top-0 left-0 right-0 px-6 pt-6 pb-4 bg-white"
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

      <div
        ref={cardRef}
        className="absolute bottom-0 left-0 right-0 bg-white flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          height: DEFAULT_H,
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.10)',
          zIndex: 10,
        }}
      >
        {/* 핸들 + 필터 영역 — 이 높이가 최소 collapsed 기준 */}
        <div ref={headerRef} className="flex-shrink-0">
          <div
            {...dragProps}
            className="flex justify-center pt-3 pb-4"
            style={{ touchAction: 'none' }}
          >
            <div className="w-10 h-1 rounded-full bg-[#d6d6d6]" />
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 pt-1 pb-3">
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

          <div className="border-t border-[#f4f4f4]" />
        </div>

        {/* 카페 리스트 */}
        <div
          className="scrollbar-hide flex-1 px-4 pb-8"
          style={{
            overflowY: sheetState === 'expanded' ? 'auto' : 'hidden',
            overscrollBehavior: 'contain',
          }}
          onTouchStart={() => { if (sheetState !== 'expanded') snapTo('expanded') }}
          onScroll={(e) => { if (e.currentTarget.scrollTop === 0) snapTo('default') }}
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
                  onSelect={() => { setSelectedCafe(prev => prev?.id === cafe.id ? null : cafe); snapTo('default') }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
