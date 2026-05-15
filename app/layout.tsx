import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const pretendard = localFont({
  src: [
    { path: '../assets/font/Pretendard-ExtraLight.ttf', weight: '200' },
    { path: '../assets/font/Pretendard-Light.otf', weight: '300' },
    { path: '../assets/font/Pretendard-Regular.otf', weight: '400' },
    { path: '../assets/font/Pretendard-Medium.otf', weight: '500' },
    { path: '../assets/font/Pretendard-SemiBold.otf', weight: '600' },
    { path: '../assets/font/Pretendard-Bold.otf', weight: '700' },
  ],
  variable: '--font-pretendard',
  display: 'swap',
})

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
    <html lang="ko" className={`h-full ${pretendard.variable} ${yangGuGothic.variable}`}>
      <body className="h-full bg-[#e8e8e8] antialiased" style={{ fontFamily: 'var(--font-pretendard), sans-serif' }}>
        <div className="relative mx-auto min-h-screen bg-white overflow-hidden" style={{ maxWidth: 430 }}>
          {children}
        </div>
      </body>
    </html>
  )
}
