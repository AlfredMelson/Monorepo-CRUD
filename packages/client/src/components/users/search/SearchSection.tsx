import { motion } from 'framer-motion'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import {
  searchFieldStateAtom,
  searchPreferenceStateAtom,
  SearchUserDialogStateAtom
} from '../../../recoil-state'
import { usersCardSearch } from '../../../style'
import CloseIcon from '../../icons/CloseIcon'

export const searchOptions = [
  { index: 1, label: 'Search by First name', field: 'firstname' },
  { index: 2, label: 'Search by Last name', field: 'lastname' },
  { index: 3, label: 'Search by City', field: 'city' },
  { index: 4, label: 'Search by Country', field: 'country' }
]

export default function SearchSection() {
  const setSearchUserDialogState = useSetRecoilState(SearchUserDialogStateAtom)

  const [searchFieldState, setSearchFieldState] = useRecoilState(searchFieldStateAtom)
  const resetSearchFieldState = useResetRecoilState(searchFieldStateAtom)

  const [searchPreferenceState, setSearchPreferenceState] =
    useRecoilState(searchPreferenceStateAtom)

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
      className='search-shadow mt-6 mb-6 grid w-full grid-cols-1 place-content-between gap-2 rounded bg-grey-700 py-4'>
      <div className='row-start-1'>
        <fieldset>
          <div className='mx-4 mb-2 grid w-full grid-cols-[_110px_110px_110px_110px] place-content-evenly'>
            <legend className='lg col-span-2 row-start-1 mb-3  text-left text-white-50'>
              Search users by :
            </legend>
            <div className='col-span-1 col-start-5 mr-4 w-12 place-self-center'>
              <button
                onClick={handleSearchClose}
                aria-label='Close Search Area'
                className=' text-blue-500 transition duration-300 ease-in-out hover:text-blue-400  focus:text-blue-400 focus:outline-none  active:text-blue-400'>
                <CloseIcon />
              </button>
            </div>
            <div className='col-start-1'>
              <label className='inline-flex items-center'>
                <input
                  className='form-radio'
                  type='radio'
                  checked={searchPreferenceState === 1}
                  name='radio-direct'
                  value='1'
                  onClick={() => setSearchPreferenceState(1)}
                />
                <span className='ml-2'>first name</span>
              </label>
            </div>
            <div className='col-start-2'>
              <label className='inline-flex items-center'>
                <input
                  className='form-radio'
                  type='radio'
                  checked={searchPreferenceState === 2}
                  name='radio-direct'
                  value='2'
                  onClick={() => setSearchPreferenceState(2)}
                />
                <span className='ml-2'>last name</span>
              </label>
            </div>
            <div className='col-start-3'>
              <label className='inline-flex items-center'>
                <input
                  className='form-radio'
                  type='radio'
                  checked={searchPreferenceState === 3}
                  name='radio-direct'
                  value='3'
                  onClick={() => setSearchPreferenceState(3)}
                />
                <span className='ml-2'>city</span>
              </label>
            </div>
            <div className='col-start-4'>
              <label className='inline-flex items-center'>
                <input
                  className='form-radio'
                  type='radio'
                  checked={searchPreferenceState === 4}
                  name='radio-direct'
                  value='4'
                  onClick={() => setSearchPreferenceState(4)}
                />
                <span className='ml-2'>country</span>
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div className='row-start-2 place-content-center px-10'>
        <input
          type='search'
          className='w-full rounded border-transparent bg-black-50 transition duration-300 ease-in-out focus:border-gold-50 focus:bg-black-50 focus:ring-0'
          placeholder={searchOptions[searchPreferenceState - 1].label}
          onChange={handleChange}
        />
      </div>
    </motion.div>
  )
}

