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

function checkbox(prop: any): boolean {
  return prop?.checkbox ?? false
}

function num(prop: any): number {
  return prop?.number ?? 0
}

export async function fetchCafes(): Promise<Cafe[]> {
  const response = await notion.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    filter: { property: '상태', select: { equals: 'active' } },
  })

  return response.results
    .filter((page: any) => page.object === 'page' && page.properties)
    .map((page: any) => {
      const p = page.properties
      return {
        id: page.id,
        name: str(p['이름']),
        address: str(p['주소']),
        region: select(p['지역']),
        lat: num(p['위도']),
        lng: num(p['경도']),
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
    })
}
