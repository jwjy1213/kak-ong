import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const yangGuGothic = localFont({
  src: '../assets/font/yanggu-gothic.ttf',
  variable: '--font-yang',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '칵옹 — 카공하기 좋은 카페 찾기',
  description: '지역과 조건으로 나에게 딱 맞는 카공 카페를 찾아보세요.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`h-full ${yangGuGothic.variable}`}>
      <body className="h-full bg-white antialiased" style={{ fontFamily: 'var(--font-yang), sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
