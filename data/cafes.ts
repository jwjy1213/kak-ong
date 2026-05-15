import { Cafe } from '@/types'

export const cafes: Cafe[] = [
  {
    "id": "리브레리",
    "name": "리브레리",
    "address": "서울 영등포구 문래동3가 55-1",
    "region": "영등포 · 문래",
    "lat": 37.5171,
    "lng": 126.8964,
    "outlet": "many",
    "wifi": true,
    "time_limit": "none",
    "noise_level": "quiet",
    "bright": true,
    "large_table": true,
    "single_seat": false,
    "memo": "문래 창작촌 근처, 책 읽기 좋은 분위기. 콘센트 자리 많고 창가 자리 추천.",
    "hours": "10:00 - 22:00",
    "status": "active",
    "created_at": "2026-05-15T16:27:58.123Z"
  },
  {
    "id": "어니언-성수",
    "name": "어니언 성수",
    "address": "서울 성동구 아차산로9길 8",
    "region": "성수",
    "lat": 37.5445,
    "lng": 127.0565,
    "outlet": "some",
    "wifi": true,
    "time_limit": "none",
    "noise_level": "normal",
    "bright": true,
    "large_table": true,
    "single_seat": false,
    "memo": "분위기 좋지만 주말엔 혼잡. 평일 오전 추천.",
    "hours": "08:00 - 22:00",
    "status": "active",
    "created_at": "2026-05-15T16:27:58.123Z"
  },
  {
    "id": "커피한약방",
    "name": "커피한약방",
    "address": "서울 마포구 와우산로 94",
    "region": "홍대 · 합정 · 마포",
    "lat": 37.5493,
    "lng": 126.9228,
    "outlet": "many",
    "wifi": true,
    "time_limit": "none",
    "noise_level": "quiet",
    "bright": false,
    "large_table": false,
    "single_seat": true,
    "memo": "1인 좌석 많아서 혼자 오기 좋음. 콘센트 넉넉.",
    "hours": "11:00 - 21:00",
    "status": "active",
    "created_at": "2026-05-15T16:27:58.123Z"
  },
  {
    "id": "카페-도토리",
    "name": "카페 도토리",
    "address": "서울 강남구 역삼동 827-46",
    "region": "강남",
    "lat": 37.4991,
    "lng": 127.0292,
    "outlet": "many",
    "wifi": true,
    "time_limit": "none",
    "noise_level": "quiet",
    "bright": true,
    "large_table": true,
    "single_seat": true,
    "memo": "강남 직장인들이 자주 찾는 카공 성지. 항상 자리 경쟁 있으니 평일 오전 추천.",
    "hours": "07:30 - 21:00",
    "status": "active",
    "created_at": "2026-05-15T16:27:58.123Z"
  },
  {
    "id": "블루보틀-한남",
    "name": "블루보틀 한남",
    "address": "서울 용산구 한남대로20길 35-3",
    "region": "용산 · 이태원 · 한남",
    "lat": 37.5348,
    "lng": 126.9984,
    "outlet": "some",
    "wifi": true,
    "time_limit": "2h",
    "noise_level": "normal",
    "bright": true,
    "large_table": false,
    "single_seat": false,
    "memo": "2시간 제한 있음. 분위기 좋지만 카공보다 미팅에 더 적합.",
    "hours": "08:00 - 21:00",
    "status": "active",
    "created_at": "2026-05-15T16:27:58.123Z"
  },
  {
    "id": "문래-카페-언노운",
    "name": "문래 카페 언노운",
    "address": "서울 영등포구 문래동6가 22",
    "region": "영등포 · 문래",
    "lat": 37.5155,
    "lng": 126.899,
    "outlet": "some",
    "wifi": true,
    "time_limit": "none",
    "noise_level": "quiet",
    "bright": false,
    "large_table": false,
    "single_seat": true,
    "memo": "아늑한 조명, 혼자 집중하기 좋음. 뮤직이 조용한 편.",
    "hours": "12:00 - 22:00",
    "status": "active",
    "created_at": "2026-05-15T16:27:58.123Z"
  },
  {
    "id": "텀어스-연희",
    "name": "텀어스 연희",
    "address": "서울 서대문구 연희동 193-10",
    "region": "홍대 · 합정 · 마포",
    "lat": 37.5657,
    "lng": 126.9285,
    "outlet": "some",
    "wifi": true,
    "time_limit": "none",
    "noise_level": "quiet",
    "bright": false,
    "large_table": true,
    "single_seat": true,
    "memo": "수원에서 연희동에 2호점을 새롭게 오픈.",
    "hours": "10:00 - 23:00",
    "status": "active",
    "created_at": "2026-05-15T16:27:58.123Z"
  },
  {
    "id": "비바보사",
    "name": "비바보사",
    "address": "서울 서대문구 동교로 296 2층",
    "region": "홍대 · 합정 · 마포",
    "lat": 37.5651,
    "lng": 126.9279,
    "outlet": "some",
    "wifi": true,
    "time_limit": "none",
    "noise_level": "quiet",
    "bright": false,
    "large_table": true,
    "single_seat": true,
    "hours": "10:00 - 23:00",
    "status": "active",
    "created_at": "2026-05-15T16:27:58.123Z"
  }
]

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
