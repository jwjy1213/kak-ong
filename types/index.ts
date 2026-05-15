export interface Cafe {
  id: string
  name: string
  address: string
  region: string
  lat: number
  lng: number
  outlet: 'many' | 'some' | 'none'
  wifi: boolean
  time_limit: 'none' | '2h' | 'custom'
  noise_level: 'quiet' | 'normal' | 'noisy'
  bright: boolean
  large_table: boolean
  single_seat: boolean
  memo?: string
  hours?: string
  kakao_url?: string
  naver_url?: string
  status: 'active' | 'pending' | 'inactive'
  created_at: string
}

export type Step = 'intro' | 'location' | 'filter' | 'main'

export type FilterKey =
  | '콘센트가 있어요'
  | '제한시간이 없었으면 좋겠어요'
  | '밝은곳이 좋아요'
  | '와이파이가 있어요'
  | '조용한 분위기가 좋아요'
  | '큰 테이블이 있으면 좋겠어요'
  | '1인 좌석이 있으면 좋겠어요'

export const REGIONS = [
  '강남',
  '홍대 · 합정 · 마포',
  '영등포 · 문래',
  '용산 · 이태원 · 한남',
  '성수',
] as const

export const FILTERS: FilterKey[] = [
  '콘센트가 있어요',
  '제한시간이 없었으면 좋겠어요',
  '밝은곳이 좋아요',
  '와이파이가 있어요',
  '조용한 분위기가 좋아요',
  '큰 테이블이 있으면 좋겠어요',
  '1인 좌석이 있으면 좋겠어요',
]

export const REGION_COORDS: Record<string, { lat: number; lng: number }> = {
  '강남': { lat: 37.4980, lng: 127.0277 },
  '홍대 · 합정 · 마포': { lat: 37.5517, lng: 126.9232 },
  '영등포 · 문래': { lat: 37.5163, lng: 126.8977 },
  '용산 · 이태원 · 한남': { lat: 37.5340, lng: 126.9839 },
  '성수': { lat: 37.5447, lng: 127.0551 },
}
