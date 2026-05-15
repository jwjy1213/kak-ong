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
          style={{ fontWeight: 600 }}
        >
          ← 뒤로
        </button>
        <h2 className="text-black leading-tight" style={{ fontSize: 32, fontWeight: 700 }}>
          어디로{'\n'}칵옹하러 갈까요?
        </h2>
      </div>

      <div className="flex-1 px-6 flex flex-col gap-0">
        {REGIONS.map((region) => {
          const isSelected = selected === region
          return (
            <button
              key={region}
              onClick={() => onSelect(region)}
              className="w-full text-left px-5 flex items-center transition-all active:opacity-70"
              style={{
                height: 80,
                backgroundColor: isSelected ? '#ffffff' : '#f4f4f4',
                border: isSelected ? '1px solid #000000' : '1px solid transparent',
                fontSize: 16,
                fontWeight: 600,
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
