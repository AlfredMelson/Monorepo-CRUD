import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useRecoilState, useRecoilValue } from 'recoil'
import { SearchUserDialogStateAtom } from '../../../recoil-state'
import { usersCardComponents, userSearchCard, userSearchCardContainer } from '../../../style'
import { SearchSection } from '../search'

export default function TaglineSection() {
  const searchUserDialogState = useRecoilValue(SearchUserDialogStateAtom)

  return (
    <motion.section layout>
      <AnimatePresence exitBeforeEnter>
        {searchUserDialogState ? (
          <motion.div
            layout
            variants={{ collapsed: { opacity: 0 }, open: { opacity: 1 } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className='search-shadow mt-6 mb-6 w-full rounded bg-grey-700 '>
            <SearchSection />
          </motion.div>
        ) : (
          <motion.h6
            layout
            variants={{ collapsed: { opacity: 0 }, open: { opacity: 1 } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className='mt-10 mb-14 text-2xl font-semibold text-white-50'>
            Current User List
          </motion.h6>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

