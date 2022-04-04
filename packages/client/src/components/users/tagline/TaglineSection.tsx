import { AnimatePresence, motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { SearchUserDialogStateAtom } from '../../../recoil-state'
import { usersCardTagline } from '../../../style'
import { SearchSection } from '../search'

export default function TaglineSection() {
  const searchUserDialogState = useRecoilValue(SearchUserDialogStateAtom)

  return (
    <motion.section variants={usersCardTagline}>
      <AnimatePresence>
        {searchUserDialogState ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='search-shadow mt-6 mb-6 w-full rounded bg-grey-700 '>
            <div>
              <SearchSection />
            </div>
          </motion.div>
        ) : (
          <motion.h6
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='mt-10 mb-14 text-2xl font-semibold text-white-50'>
            Current User List
          </motion.h6>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

