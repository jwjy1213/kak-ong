'use client'

import { REGIONS } from '@/types'

interface Props {
  selected: string
  onSelect: (region: string) => void
  onBack: () => void
}

export default function LocationSelect({ selected, onSelect, onBack }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="px-6 pt-14 pb-4">
        <button
          onClick={onBack}
          className="text-black text-sm mb-8 flex items-center gap-1 active:opacity-50"
          style={{ fontWeight: 700 }}
        >
          ← 뒤로
        </button>
        <h2 className="text-black" style={{ fontSize: 28, fontWeight: 700 }}>
          어디로 갈까요?
        </h2>
      </div>

      <div className="flex-1 px-6 flex flex-col gap-5">
        {REGIONS.map((region) => {
          const isSelected = selected === region
          return (
            <button
              key={region}
              onClick={() => onSelect(region)}
              className="w-full text-left px-5 flex items-center transition-all active:opacity-70"
              style={{
                height: 86,
                borderRadius: 12,
                backgroundColor: isSelected ? '#ffffff' : '#f4f4f4',
                border: isSelected ? '1px solid #000000' : '1px solid transparent',
                fontSize: 24,
                fontWeight: 700,
                color: '#000000',
              }}
            >
              {region}
            </button>
          )
        })}
      </div>
    </div>
  )
}
