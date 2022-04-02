import { motion } from 'framer-motion'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { searchFieldStateAtom, SearchUserDialogStateAtom } from '../../../recoil-state'
import { usersCardSearch } from '../../../style'
import CloseIcon from '../../icons/CloseIcon'

export default function SearchSection() {
  const setSearchUserDialogState = useSetRecoilState(SearchUserDialogStateAtom)

  const [searchFieldState, setSearchFieldState] = useRecoilState(searchFieldStateAtom)
  const resetSearchFieldState = useResetRecoilState(searchFieldStateAtom)

  const handleChange = (e: any) => {
    setSearchFieldState(e.target.value)
  }
  const handleSearchClose = (_e: any) => {
    resetSearchFieldState(), setSearchUserDialogState(false)
  }
  console.log('searchFieldState', searchFieldState)

  return (
    <motion.div
      variants={usersCardSearch}
      layout
      className='grid-cols-[20px_400px_20px_20px ] mt-6 mb-6 grid w-full place-content-between gap-2 rounded bg-grey-700 py-4 '>
      <div className='col-span-2 col-start-1 place-content-center'>
        <input
          type='search'
          className='rounded border-transparent bg-black-50 transition duration-300 ease-in-out focus:border-gold-50 focus:bg-black-50 focus:ring-0'
          placeholder='Search by Lastname'
          onChange={handleChange}
        />
      </div>
      <div className='col-span-1 col-start-3 mr-4 w-12 place-self-center'>
        <button
          onClick={handleSearchClose}
          aria-label='Close Search Area'
          className=' text-blue-500 transition duration-300 ease-in-out hover:text-blue-400  focus:text-blue-400 focus:outline-none  active:text-blue-400'>
          <CloseIcon />
        </button>
      </div>
    </motion.div>
  )
}

