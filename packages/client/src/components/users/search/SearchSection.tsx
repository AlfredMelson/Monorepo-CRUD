import { motion } from 'framer-motion'
import { SearchHeader, SearchInput, SearchSelectors } from '.'

export default function SearchSection() {
  return (
    <div className='grid grid-cols-1 place-content-between gap-2 py-4'>
      <SearchHeader />
      <SearchSelectors />
      <SearchInput />
    </div>
  )
}

