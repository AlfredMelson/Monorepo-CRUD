import { AnimatePresence, motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { SearchUserDialogStateAtom } from '../../../recoil-state'
import { usersCardTagline } from '../../../style'
import { SearchSection } from '../search'

export default function TaglineSection() {
  const searchUserDialogState = useRecoilValue(SearchUserDialogStateAtom)

  return (
    <motion.section
      variants={usersCardTagline}
      className='grid h-36 grid-cols-1 grid-rows-1 content-center'>
      <AnimatePresence>
        {searchUserDialogState ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='search-shadow w-full auto-rows-auto self-center rounded bg-grey-700'>
            <div>
              <SearchSection />
            </div>
          </motion.div>
        ) : (
          <motion.h6
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='auto-rows-auto self-center pb-3 text-2xl font-semibold text-white-50'>
            Current User List
          </motion.h6>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

