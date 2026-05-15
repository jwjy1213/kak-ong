'use client'

interface Props {
  onStart: () => void
}

export default function IntroScreen({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white px-6 py-16">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1
          className="text-black text-center leading-tight"
          style={{ fontSize: 76, fontWeight: 700, letterSpacing: '-0.02em' }}
        >
          칵옹
        </h1>
      </div>
      <button
        onClick={onStart}
        className="w-full bg-black text-white text-xl font-bold py-5 active:opacity-70 transition-opacity"
        style={{ fontWeight: 700 }}
      >
        시작하기
      </button>
    </div>
  )
}
