import { Client } from '@notionhq/client'
import { Cafe } from '@/types'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const DATA_SOURCE_ID = process.env.NOTION_DATA_SOURCE_ID!

function str(prop: any): string {
  if (!prop) return ''
  if (prop.type === 'rich_text') return prop.rich_text?.[0]?.plain_text ?? ''
  if (prop.type === 'title') return prop.title?.[0]?.plain_text ?? ''
  if (prop.type === 'url') return prop.url ?? ''
  return ''
}

function select(prop: any): string {
  return prop?.select?.name ?? ''
}

const REGION_MAP: Record<string, string> = {
  '영등포·문래': '영등포 · 문래',
  '홍대·합정·마포': '홍대 · 합정 · 마포',
  '용산·이태원·한남': '용산 · 이태원 · 한남',
}

function normalizeRegion(r: string): string {
  return REGION_MAP[r] ?? r
}

function checkbox(prop: any): boolean {
  return prop?.checkbox ?? false
}

function num(prop: any): number {
  return prop?.number ?? 0
}

async function geocode(name: string, address: string): Promise<{ lat: number; lng: number } | null> {
  const key = process.env.KAKAO_REST_API_KEY
  if (!key) return null
  const query = encodeURIComponent(`${name} ${address}`)
  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&size=1`,
    { headers: { Authorization: `KakaoAK ${key}` } }
  )
  const data = await res.json() as { documents?: { x: string; y: string }[] }
  const doc = data.documents?.[0]
  if (!doc) return null
  return { lat: parseFloat(doc.y), lng: parseFloat(doc.x) }
}

export async function fetchCafes(): Promise<Cafe[]> {
  const response = await notion.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    filter: { property: '상태', select: { equals: 'active' } },
  })

  const pages = response.results.filter((page: any) => page.object === 'page' && page.properties)

  return Promise.all(pages.map(async (page: any) => {
    const p = page.properties
    let lat = num(p['위도'])
    let lng = num(p['경도'])

    if (!lat || !lng) {
      const coords = await geocode(str(p['이름']), str(p['주소']))
      if (coords) { lat = coords.lat; lng = coords.lng }
    }

    return {
      id: page.id,
      name: str(p['이름']),
      address: str(p['주소']),
      region: normalizeRegion(select(p['지역'])),
      lat,
      lng,
      hours: str(p['영업시간']) || undefined,
      outlet: (select(p['콘센트']) || 'none') as Cafe['outlet'],
      wifi: checkbox(p['와이파이']),
      time_limit: (select(p['제한시간']) || 'none') as Cafe['time_limit'],
      noise_level: (select(p['소음']) || 'normal') as Cafe['noise_level'],
      bright: checkbox(p['밝기']),
      large_table: checkbox(p['큰테이블']),
      single_seat: checkbox(p['1인석']),
      memo: str(p['메모']) || undefined,
      kakao_url: str(p['카카오URL']) || undefined,
      naver_url: str(p['네이버URL']) || undefined,
      status: 'active',
      created_at: page.created_time,
    }
  }))
}
