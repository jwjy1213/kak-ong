'use client'

import { Cafe, FILTERS } from '@/types'
import KakaoMap from './KakaoMap'
import CafeCard from './CafeCard'

interface Props {
  cafes: Cafe[]
  location: string
  activeFilters: Set<string>
  onBack: () => void
}

export default function MainScreen({ cafes, location, activeFilters, onBack }: Props) {
  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* 헤더 */}
      <div className="flex-shrink-0 px-6 pt-14 pb-4">
        <button
          onClick={onBack}
          className="text-black text-sm mb-6 flex items-center gap-1 active:opacity-50"
          style={{ fontWeight: 600 }}
        >
          ← 다시 찾기
        </button>
        <div>
          <p className="text-black leading-tight" style={{ fontSize: 32, fontWeight: 700 }}>
            {location}에서
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-black" style={{ fontSize: 32, fontWeight: 700 }}>
              칵옹하기
            </p>
            <p style={{ fontSize: 20, fontWeight: 500 }}>
              =^•ﻌ•^=
            </p>
          </div>
        </div>
      </div>

      {/* 지도 + 하단 카드 */}
      <div className="relative flex-1">
        {/* 지도 (전체 채움) */}
        <div className="absolute inset-0">
          <KakaoMap cafes={cafes} region={location} />
        </div>

        {/* 하단 흰 카드 */}
        <div className="absolute bottom-0 left-0 right-0 bg-white" style={{ height: '52%' }}>
          {/* 필터 태그 (전체 표시) */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-6 pt-4 pb-3">
            {FILTERS.map((f) => {
              const active = activeFilters.has(f)
              return (
                <span
                  key={f}
                  className="flex-shrink-0"
                  style={{
                    fontSize: 16,
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
                >
                  {f}
                </span>
              )
            })}
          </div>

          {/* 구분선 */}
          <div className="border-t border-[#f4f4f4] mx-6" />

          {/* 카페 목록 */}
          <div className="overflow-y-auto scrollbar-hide h-full px-6 pb-8">
            {cafes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32">
                <p className="text-[#a3a3a3] font-bold text-lg">조건에 맞는 카페가 없어요</p>
                <p className="text-[#a3a3a3] text-sm mt-1">필터를 줄여보세요</p>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-[#f4f4f4]">
                {cafes.map((cafe) => (
                  <CafeCard key={cafe.id} cafe={cafe} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
