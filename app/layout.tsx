import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
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
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_MAPS_KEY

  return (
    <html lang="ko" className={`h-full ${yangGuGothic.variable}`}>
      <body className="h-full bg-white antialiased" style={{ fontFamily: 'var(--font-yang), sans-serif' }}>
        {kakaoKey && (
          <Script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`}
            strategy="beforeInteractive"
          />
        )}
        {children}
      </body>
    </html>
  )
}
