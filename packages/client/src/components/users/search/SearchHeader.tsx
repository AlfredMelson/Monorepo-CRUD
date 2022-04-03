import { useResetRecoilState, useSetRecoilState } from 'recoil'
import { searchFieldStateAtom, SearchUserDialogStateAtom } from '../../../recoil-state'
import CloseIcon from '../../icons/CloseIcon'

export default function SearchHeader() {
  const setSearchUserDialogState = useSetRecoilState(SearchUserDialogStateAtom)

  const resetSearchFieldState = useResetRecoilState(searchFieldStateAtom)

  const handleSearchClose = (_e: any) => {
    resetSearchFieldState(), setSearchUserDialogState(false)
  }

  return (
    <div className='row-start-1'>
      <div className='mb-2 grid  grid-cols-[_110px_110px_110px_110px] place-content-between gap-4'>
        <legend className='text-md col-span-2 row-start-1 mb-3 ml-6 text-left text-white-50'>
          Search users by :
        </legend>
        <div className='col-span-1 col-start-5'>
          <button
            onClick={handleSearchClose}
            aria-label='Close Search Area'
            className='mr-6 text-blue-500 transition duration-300 ease-in-out  hover:text-blue-400  focus:text-blue-400 focus:outline-none active:text-blue-400'>
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

