import { fetchCafes } from '@/lib/notion'
import HomeClient from '@/components/HomeClient'

export const revalidate = 3600

export default async function Home() {
  const allCafes = await fetchCafes()
  return <HomeClient allCafes={allCafes} />
}
