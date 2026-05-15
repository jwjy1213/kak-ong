'use client'

import { FILTERS, FilterKey } from '@/types'

interface Props {
  selected: Set<string>
  onToggle: (filter: FilterKey) => void
  onConfirm: () => void
  onBack: () => void
}

export default function FilterSelect({ selected, onToggle, onConfirm, onBack }: Props) {
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
          필터를 선택해주세요
        </h2>
      </div>

      <div className="flex-1 px-6 flex flex-col gap-5 pb-32">
        {FILTERS.map((filter) => {
          const isSelected = selected.has(filter)
          return (
            <button
              key={filter}
              onClick={() => onToggle(filter)}
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
              {filter}
            </button>
          )
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0">
        <button
          onClick={onConfirm}
          className="w-full bg-black text-white flex items-center justify-center active:opacity-70 transition-opacity"
          style={{ height: 84, fontSize: 24, fontWeight: 700 }}
        >
          다 선택했어요
        </button>
      </div>
    </div>
  )
}
