import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
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

const BASE_URL = 'https://kak-ong.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: '칵옹 — 카공하기 좋은 카페 찾기',
  description: '지역과 조건으로 나에게 딱 맞는 카공 카페를 찾아보세요. 콘센트, 와이파이, 조용한 분위기 등 원하는 조건의 카페를 바로 찾아보세요.',
  keywords: ['카공카페', '카공', '카페', '공부카페', '스터디카페', '칵옹', '카공하기좋은카페', '카페추천'],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: '칵옹 — 카공하기 좋은 카페 찾기',
    description: '지역과 조건으로 나에게 딱 맞는 카공 카페를 찾아보세요.',
    url: BASE_URL,
    siteName: '칵옹',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/og-image-v2.png',
        width: 1200,
        height: 630,
        alt: '칵옹 — 카공하기 좋은 카페 찾기',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '칵옹 — 카공하기 좋은 카페 찾기',
    description: '지역과 조건으로 나에게 딱 맞는 카공 카페를 찾아보세요.',
    images: ['/og-image-v2.png'],
  },
  verification: {
    google: 'uviz2GOrby34clhLLlS4HF-iUrYsjRDzo9S1MetRgMU',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export const viewport = {
  viewportFit: 'cover',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '칵옹',
  description: '지역과 조건으로 나에게 딱 맞는 카공 카페를 찾아보세요.',
  url: BASE_URL,
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'All',
  inLanguage: 'ko',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`h-full ${pretendard.variable} ${yangGuGothic.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="h-full bg-[#e8e8e8] antialiased" style={{ fontFamily: 'var(--font-pretendard), sans-serif' }}>
        <div className="relative mx-auto bg-white overflow-hidden" style={{ maxWidth: 430, height: '100dvh' }}>
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
