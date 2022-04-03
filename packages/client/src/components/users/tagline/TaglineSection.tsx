import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { SearchUserDialogStateAtom } from '../../../recoil-state'
import { usersCardComponents, userSearchCard, userSearchCardContainer } from '../../../style'
import { SearchSection } from '../search'

export default function TaglineSection() {
  const [searchUserDialogState, setSearchUserDialogState] =
    useRecoilState(SearchUserDialogStateAtom)

  const closeSearch = (event: any) => {
    if (event.keyCode === 27 || event.currentTarget === event.target) {
      setSearchUserDialogState(false)
    }
  }

  window.addEventListener('keydown', (event) => closeSearch(event))

  return (
    <div onClick={(event) => closeSearch(event)}>
      <motion.section
        initial='collapsed'
        animate='open'
        exit='collapsed'
        variants={userSearchCardContainer}
        transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}>
        {searchUserDialogState ? (
          <AnimatePresence exitBeforeEnter>
            <motion.div
              variants={{ collapsed: { height: 0 }, open: { height: 'auto' } }}
              transition={{ duration: 0.7 }}
              className='search-shadow mt-6 mb-6 w-full rounded bg-grey-700 '>
              <SearchSection />
            </motion.div>
          </AnimatePresence>
        ) : (
          <AnimatePresence exitBeforeEnter>
            <motion.h6
              variants={{ collapsed: { opacity: 0 }, open: { opacity: 1 } }}
              transition={{ duration: 0.7 }}
              className='mt-9 mb-14 text-2xl font-semibold text-white-50'>
              Current User List
            </motion.h6>
          </AnimatePresence>
        )}
      </motion.section>
    </div>
  )
}

