'use client'

import { useState } from 'react'
import { Step, FilterKey, Cafe } from '@/types'
import { filterCafes } from '@/data/cafes'
import IntroScreen from '@/components/IntroScreen'
import LocationSelect from '@/components/LocationSelect'
import FilterSelect from '@/components/FilterSelect'
import MainScreen from '@/components/MainScreen'

export default function HomeClient({ allCafes }: { allCafes: Cafe[] }) {
  const [step, setStep] = useState<Step>('intro')
  const [location, setLocation] = useState('')
  const [filters, setFilters] = useState<Set<string>>(new Set())

  const toggleFilter = (filter: FilterKey) => {
    setFilters((prev) => {
      const next = new Set(prev)
      if (next.has(filter)) next.delete(filter)
      else next.add(filter)
      return next
    })
  }

  const handleLocationSelect = (region: string) => {
    setLocation(region)
    setStep('filter')
  }

  const matchedCafes = filterCafes(allCafes, location, filters)

  if (step === 'intro') {
    return <IntroScreen onStart={() => setStep('location')} />
  }

  if (step === 'location') {
    return (
      <LocationSelect
        selected={location}
        onSelect={handleLocationSelect}
        onBack={() => { setLocation(''); setStep('intro') }}
      />
    )
  }

  if (step === 'filter') {
    return (
      <FilterSelect
        selected={filters}
        onToggle={toggleFilter}
        onConfirm={() => setStep('main')}
        onBack={() => { setFilters(new Set()); setStep('location') }}
      />
    )
  }

  return (
    <MainScreen
      cafes={matchedCafes}
      location={location}
      activeFilters={filters}
      onBack={() => { setLocation(''); setFilters(new Set()); setStep('intro') }}
      onToggleFilter={toggleFilter}
    />
  )
}
