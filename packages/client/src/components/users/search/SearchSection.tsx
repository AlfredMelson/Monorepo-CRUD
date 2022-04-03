import { motion } from 'framer-motion'
import { SearchHeader, SearchInput, SearchSelectors } from '.'

export default function SearchSection() {
  return (
    <motion.div
      variants={{ collapsed: { opacity: 0 }, open: { opacity: 1 } }}
      transition={{ delay: 0.6, duration: 0.3 }}
      className='grid  grid-cols-1 place-content-between gap-2 py-4'>
      <SearchHeader />
      <SearchSelectors />
      <SearchInput />
    </motion.div>
  )
}

