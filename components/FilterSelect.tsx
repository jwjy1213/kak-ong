'use client'

import { motion } from 'framer-motion'
import { FILTERS, FilterKey } from '@/types'

interface Props {
  selected: Set<string>
  onToggle: (filter: FilterKey) => void
  onConfirm: () => void
  onBack: () => void
}

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const listItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 180, damping: 22 } },
}

export default function FilterSelect({ selected, onToggle, onConfirm, onBack }: Props) {
  return (
    <div className="flex flex-col bg-white" style={{ height: '100dvh' }}>
      <motion.div
        className="px-6 pt-14 pb-4 flex-shrink-0"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 24 }}
      >
        <motion.button
          onClick={onBack}
          className="text-black text-sm mb-8 flex items-center gap-1"
          style={{ fontWeight: 600 }}
          whileTap={{ scale: 0.92 }}
        >
          ← 뒤로
        </motion.button>
        <h2 className="text-black" style={{ fontSize: 32, fontWeight: 700, fontFamily: 'var(--font-yang)', lineHeight: '44px' }}>
          필터를<br /> 선택해주세요
        </h2>
      </motion.div>

      <div className="flex-1 overflow-y-auto px-6">
        <motion.div
          className="flex flex-col gap-4 mb-8"
          variants={listContainer}
          initial="hidden"
          animate="show"
        >
          {FILTERS.map((filter) => {
            const isSelected = selected.has(filter)
            return (
              <motion.button
                key={filter}
                onClick={() => onToggle(filter)}
                className="w-full text-left px-5 flex items-center"
                style={{
                  height: 80,
                  backgroundColor: isSelected ? '#ffffff' : '#f4f4f4',
                  border: isSelected ? '1px solid #000000' : '1px solid transparent',
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#000000',
                }}
                variants={listItem}
                whileTap={{ scale: 0.97 }}
              >
                {filter}
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      <motion.button
        onClick={onConfirm}
        className="flex-shrink-0 w-full bg-black text-white flex items-center justify-center"
        style={{ height: 84, fontSize: 20, fontWeight: 700, paddingBottom: 'env(safe-area-inset-bottom)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 22, delay: 0.55 }}
        whileTap={{ scale: 0.98 }}
      >
        다 선택했어요
      </motion.button>
    </div>
  )
}
