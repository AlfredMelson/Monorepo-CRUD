import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { SearchUserDialogStateAtom } from '../../../recoil-state'
import { usersCardComponents } from '../../../style'
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
      {searchUserDialogState ? (
        <SearchSection />
      ) : (
        <motion.h6
          variants={usersCardComponents}
          layout
          className='mt-9 mb-14 text-2xl font-semibold text-white-50'>
          Current User List
        </motion.h6>
      )}
    </div>
  )
}

