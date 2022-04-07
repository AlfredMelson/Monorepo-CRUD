import { AnimatePresence } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { SearchUserDialogStateAtom } from '../../../recoil-state'
import { SearchSection } from '../search'
import Tagline from './Tagline'

export default function TaglineSection() {
  const searchUserDialogState = useRecoilValue(SearchUserDialogStateAtom)

  return (
    <div className='grid h-36 grid-cols-1 grid-rows-1 content-center'>
      <AnimatePresence>
        {searchUserDialogState && <SearchSection />}
        {!searchUserDialogState && <Tagline />}
      </AnimatePresence>
    </div>
  )
}

