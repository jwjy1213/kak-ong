import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const REST_KEY = process.env.KAKAO_REST_API_KEY

// ─── 파서 ────────────────────────────────────────────────

function parseBoolean(v: string) {
  return ['o', 'O', '있음', 'true', 'yes'].includes(v.trim())
}

function parseOutlet(v: string): 'many' | 'some' | 'none' {
  if (v.includes('많')) return 'many'
  if (v.includes('일부') || v.includes('some')) return 'some'
  return 'none'
}

function parseTimeLimit(v: string): 'none' | '2h' | 'custom' {
  if (v.includes('없')) return 'none'
  if (v.includes('2')) return '2h'
  return 'custom'
}

function parseNoise(v: string): 'quiet' | 'normal' | 'noisy' {
  if (v.includes('조용')) return 'quiet'
  if (v.includes('시끄') || v.includes('혼잡')) return 'noisy'
  return 'normal'
}

function toSlug(name: string) {
  return name.trim().replace(/\s+/g, '-').replace(/[^\w가-힣-]/g, '').toLowerCase()
}

interface RawCafe {
  name: string
  region: string
  address: string
  lat?: number
  lng?: number
  outlet: 'many' | 'some' | 'none'
  wifi: boolean
  time_limit: 'none' | '2h' | 'custom'
  bright: boolean
  noise_level: 'quiet' | 'normal' | 'noisy'
  large_table: boolean
  single_seat: boolean
  hours?: string
  memo?: string
  kakao_url?: string
  naver_url?: string
}

function parseMd(content: string): RawCafe[] {
  const sections = content.split(/\n(?=## )/).map(s => s.trim()).filter(s => s.startsWith('## '))
  return sections.map(section => {
    const lines = section.split('\n')
    const name = lines[0].replace('## ', '').trim()
    const fields: Record<string, string> = {}
    for (const line of lines.slice(1)) {
      const m = line.match(/^- ([^:]+):\s*(.+)/)
      if (m) fields[m[1].trim()] = m[2].replace(/#.*$/, '').trim()
    }
    return {
      name,
      region: fields['지역'] ?? '',
      address: fields['주소'] ?? '',
      ...(fields['lat'] && { lat: parseFloat(fields['lat']) }),
      ...(fields['lng'] && { lng: parseFloat(fields['lng']) }),
      outlet: parseOutlet(fields['콘센트'] ?? ''),
      wifi: parseBoolean(fields['와이파이'] ?? ''),
      time_limit: parseTimeLimit(fields['시간제한'] ?? ''),
      bright: (fields['밝기'] ?? '').includes('밝'),
      noise_level: parseNoise(fields['분위기'] ?? ''),
      large_table: parseBoolean(fields['큰 테이블'] ?? ''),
      single_seat: parseBoolean(fields['1인 좌석'] ?? ''),
      ...(fields['영업시간'] && { hours: fields['영업시간'] }),
      ...(fields['메모'] && { memo: fields['메모'] }),
      ...(fields['카카오지도'] && { kakao_url: fields['카카오지도'] }),
      ...(fields['네이버지도'] && { naver_url: fields['네이버지도'] }),
    }
  })
}

// ─── 좌표 조회 ───────────────────────────────────────────

async function geocode(name: string, address: string) {
  if (!REST_KEY) return null
  const query = encodeURIComponent(`${name} ${address}`)
  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&size=1`,
    { headers: { Authorization: `KakaoAK ${REST_KEY}` } }
  )
  const data = (await res.json()) as { documents?: { x: string; y: string }[] }
  const doc = data.documents?.[0]
  if (!doc) return null
  return { lat: parseFloat(doc.y), lng: parseFloat(doc.x) }
}

// ─── 메인 ────────────────────────────────────────────────

async function main() {
  const mdPath = path.join(ROOT, 'cafes.md')
  const outPath = path.join(ROOT, 'data', 'cafes.ts')

  let content: string
  try {
    content = await fs.readFile(mdPath, 'utf-8')
  } catch {
    console.error('❌ cafes.md 파일을 찾을 수 없어요.')
    process.exit(1)
  }

  if (!REST_KEY) {
    console.warn('⚠️  KAKAO_REST_API_KEY 없음 — 좌표 자동 조회를 건너뜁니다.')
    console.warn('   .env.local에 KAKAO_REST_API_KEY=<REST API 키> 를 추가하면 자동으로 채워져요.\n')
  }

  const parsed = parseMd(content)
  console.log(`📋 ${parsed.length}개 카페 파싱 완료\n`)

  // 기존 파일에서 좌표 읽기 (API 없을 때 유지)
  let existingCoords: Record<string, { lat: number; lng: number }> = {}
  try {
    const existing = await fs.readFile(outPath, 'utf-8')
    const matches = [...existing.matchAll(/"name":\s*"([^"]+)"[\s\S]*?"lat":\s*([\d.]+),[\s\S]*?"lng":\s*([\d.]+)/g)]
    for (const m of matches) {
      existingCoords[m[1]] = { lat: parseFloat(m[2]), lng: parseFloat(m[3]) }
    }
  } catch { /* 파일 없으면 무시 */ }

  const cafes = await Promise.all(parsed.map(async (c, i) => {
    let coords: { lat: number; lng: number } | null = c.lat && c.lng ? { lat: c.lat, lng: c.lng } : null
    if (coords) {
      console.log(`✓ ${c.name}: MD 좌표 사용 (${coords.lat}, ${coords.lng})`)
    } else {
      coords = await geocode(c.name, c.address)
      if (coords) {
        console.log(`✓ ${c.name}: API 좌표 조회 성공 (${coords.lat}, ${coords.lng})`)
      } else if (existingCoords[c.name]) {
        coords = existingCoords[c.name]
        console.log(`↩ ${c.name}: 기존 좌표 유지 (${coords.lat}, ${coords.lng})`)
      } else {
        console.warn(`✗ ${c.name}: 좌표 없음 — lat/lng 직접 입력하거나 KAKAO_REST_API_KEY를 추가해주세요`)
      }
    }

    return {
      id: toSlug(c.name) || String(i + 1),
      name: c.name,
      address: c.address,
      region: c.region,
      lat: coords?.lat ?? 0,
      lng: coords?.lng ?? 0,
      outlet: c.outlet,
      wifi: c.wifi,
      time_limit: c.time_limit,
      noise_level: c.noise_level,
      bright: c.bright,
      large_table: c.large_table,
      single_seat: c.single_seat,
      ...(c.memo && { memo: c.memo }),
      ...(c.hours && { hours: c.hours }),
      ...(c.kakao_url && { kakao_url: c.kakao_url }),
      ...(c.naver_url && { naver_url: c.naver_url }),
      status: 'active' as const,
      created_at: new Date().toISOString(),
    }
  }))

  const code = `import { Cafe } from '@/types'

export const cafes: Cafe[] = ${JSON.stringify(cafes, null, 2)}

export function filterCafes(
  allCafes: Cafe[],
  location: string,
  filters: Set<string>
): Cafe[] {
  return allCafes.filter((cafe) => {
    if (cafe.region !== location) return false
    if (cafe.status !== 'active') return false
    if (filters.size === 0) return true

    for (const filter of filters) {
      switch (filter) {
        case '콘센트가 있으면 좋겠어요':
          if (cafe.outlet === 'none') return false
          break
        case '제한시간이 없었으면 좋겠어요':
          if (cafe.time_limit !== 'none') return false
          break
        case '밝은곳이 좋아요':
          if (!cafe.bright) return false
          break
        case '와이파이가 있어요':
          if (!cafe.wifi) return false
          break
        case '조용한 분위기가 좋아요':
          if (cafe.noise_level !== 'quiet') return false
          break
        case '큰 테이블이 있으면 좋겠어요':
          if (!cafe.large_table) return false
          break
        case '1인 좌석이 있으면 좋겠어요':
          if (!cafe.single_seat) return false
          break
      }
    }
    return true
  })
}
`

  await fs.writeFile(outPath, code)
  console.log(`\n✅ data/cafes.ts 업데이트 완료 (${cafes.length}개 카페)`)
}

main().catch(console.error)
