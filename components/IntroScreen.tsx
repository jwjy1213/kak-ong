'use client'

interface Props {
  onStart: () => void
}

export default function IntroScreen({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white px-6 py-16">
      <div className="flex-1 flex flex-col items-center justify-center gap-0">
        <div className="flex flex-col items-center mb-4">
          <p className="text-black" style={{ fontSize: 23, fontWeight: 400 }}>
            =^•ﻌ•^=
          </p>
          <p className="text-black" style={{ fontSize: 14, fontWeight: 600 }}>
            공부할 카페 찾기 서비스
          </p>
        </div>
        <h1
          className="text-black text-center leading-tight"
          style={{ fontSize: 76, fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'var(--font-yang)' }}
        >
          칵옹
        </h1>
      </div>
      <button
        onClick={onStart}
        className="w-full bg-black text-white flex items-center justify-center active:opacity-70 transition-opacity"
        style={{ height: 84, fontSize: 20, fontWeight: 700 }}
      >
        칵옹하러 가기
      </button>
    </div>
  )
}
