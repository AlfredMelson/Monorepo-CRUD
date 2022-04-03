import { useRecoilValue, useSetRecoilState } from 'recoil'
import { searchFieldStateAtom, searchPreferenceStateAtom } from '../../../recoil-state'
import { searchOptions } from './SearchSelectors'

export default function SearchInput() {
  const setSearchFieldState = useSetRecoilState(searchFieldStateAtom)

  const searchPreferenceState = useRecoilValue(searchPreferenceStateAtom)

  const handleChange = (e: any) => {
    setSearchFieldState(e.target.value)
  }

  return (
    <div className='mx-10 place-content-center'>
      <input
        type='search'
        className='w-full rounded border-transparent bg-black-50 transition duration-300 ease-in-out focus:border-gold-50 focus:bg-black-50 focus:ring-0'
        placeholder={`Search by ${searchOptions[searchPreferenceState - 1].label} ...`}
        onChange={handleChange}
      />
    </div>
  )
}

