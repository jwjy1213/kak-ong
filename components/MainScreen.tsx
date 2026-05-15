'use client'

import { Cafe } from '@/types'
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
      {/* 지도 영역 */}
      <div className="relative flex-shrink-0" style={{ height: '55vh' }}>
        <KakaoMap cafes={cafes} region={location} />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white text-black text-sm font-bold px-3 py-2 shadow-md active:opacity-70 z-10"
          style={{ borderRadius: 8 }}
        >
          ← 다시 선택
        </button>
      </div>

      {/* 하단 콘텐츠 */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* 흰 배경 패널 */}
        <div className="bg-white px-6 pt-5">
          {/* 제목 */}
          <div className="mb-4">
            <p className="text-black" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.3 }}>
              {location}에서
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-black" style={{ fontSize: 28, fontWeight: 700 }}>
                칵옹하기
              </p>
              <p style={{ fontSize: 20, fontWeight: 700 }}>=^•ﻌ•^=</p>
            </div>
          </div>

          {/* 활성 필터 태그 */}
          {activeFilters.size > 0 && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4">
              {[...activeFilters].map((f) => (
                <span
                  key={f}
                  className="flex-shrink-0 bg-black text-white font-bold"
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    height: 37,
                    borderRadius: 999,
                    padding: '0 16px',
                    display: 'flex',
                    alignItems: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {f}
                </span>
              ))}
              {/* 비활성 필터도 표시 */}
            </div>
          )}

          {/* 구분선 */}
          <div className="border-t border-[#f4f4f4]" />

          {/* 카페 목록 */}
          {cafes.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#a3a3a3] font-bold text-lg">조건에 맞는 카페가 없어요</p>
              <p className="text-[#a3a3a3] text-sm mt-1">필터를 줄여보세요</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-[#f4f4f4] pb-8">
              {cafes.map((cafe) => (
                <CafeCard key={cafe.id} cafe={cafe} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
