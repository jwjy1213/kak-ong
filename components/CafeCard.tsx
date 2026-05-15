'use client'

import { Cafe } from '@/types'

interface Props {
  cafe: Cafe
}

export default function CafeCard({ cafe }: Props) {
  return (
    <div className="flex gap-4 py-4">
      {/* 썸네일 */}
      <div
        className="flex-shrink-0 bg-[#d6d6d6]"
        style={{ width: 100, height: 100, borderRadius: 10 }}
      />

      {/* 텍스트 */}
      <div className="flex flex-col justify-center min-w-0">
        <p className="text-black truncate" style={{ fontSize: 24, fontWeight: 700 }}>
          {cafe.name}
        </p>
        <p className="text-black truncate mt-1" style={{ fontSize: 14, fontWeight: 700 }}>
          {cafe.address}
        </p>
        {cafe.memo && (
          <p className="text-[#a3a3a3] text-xs mt-1 line-clamp-2">{cafe.memo}</p>
        )}
        {(cafe.kakao_url || cafe.naver_url) && (
          <div className="flex gap-2 mt-2">
            {cafe.kakao_url && (
              <a
                href={cafe.kakao_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold px-3 py-1 bg-[#FAE100] text-black rounded-full active:opacity-70"
              >
                카카오
              </a>
            )}
            {cafe.naver_url && (
              <a
                href={cafe.naver_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold px-3 py-1 bg-[#03C75A] text-white rounded-full active:opacity-70"
              >
                네이버
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
