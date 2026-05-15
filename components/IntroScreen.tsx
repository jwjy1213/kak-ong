'use client'

import { motion } from 'framer-motion'

interface Props {
  onStart: () => void
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
}

export default function IntroScreen({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center bg-white pt-16" style={{ height: "100dvh" }}>
      <motion.div
        className="flex-1 flex flex-col items-center justify-center gap-6 px-6 pb-5"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-col items-center mb-4 gap-2">
          <motion.p
            className="text-black"
            style={{ fontSize: 23, fontWeight: 400 }}
            variants={fadeUp}
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          >
            =^•ﻌ•^=
          </motion.p>
          <motion.p
            className="text-black flex px-3 py-2"
            style={{ fontSize: 14, fontWeight: 600, borderRadius: 6, border: '1px solid #000' }}
            variants={fadeUp}
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          >
            공부할 카페 찾기 서비스
          </motion.p>
        </div>
        <motion.h1
          className="text-black text-center leading-tight"
          style={{ fontSize: 76, fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'var(--font-yang)' }}
          variants={fadeUp}
          transition={{ type: 'spring', stiffness: 160, damping: 20 }}
        >
          칵옹
        </motion.h1>
      </motion.div>

      <motion.button
        onClick={onStart}
        className="w-full bg-black text-white flex items-center justify-center flex-shrink-0"
        style={{ height: 84, fontSize: 20, fontWeight: 700, paddingBottom: 'env(safe-area-inset-bottom)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 22, delay: 0.7 }}
        whileTap={{ scale: 0.97 }}
      >
        칵옹하러 가기
      </motion.button>
    </div>
  )
}
