'use client'

import { motion } from 'framer-motion'
import { REGIONS } from '@/types'

interface Props {
  selected: string
  onSelect: (region: string) => void
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

export default function LocationSelect({ selected, onSelect, onBack }: Props) {
  return (
    <div className="flex flex-col bg-white" style={{ height: '100dvh' }}>
      <motion.div
        className="px-6 pt-14 pb-4"
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
          어디로{'\n'}<br />칵옹하러 갈까요?
        </h2>
      </motion.div>

      <div className="flex-1 overflow-y-auto px-6">
        <motion.div
          className="flex flex-col gap-4"
          variants={listContainer}
          initial="hidden"
          animate="show"
        >
          {REGIONS.map((region) => {
            const isSelected = selected === region
            return (
              <motion.button
                key={region}
                onClick={() => onSelect(region)}
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
                {region}
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
