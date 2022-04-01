import { useSetRecoilState } from 'recoil'
import { SearchUserDialogStateAtom } from '../../../recoil-state'
import { SearchUsersIcon } from '../../icons'

export default function SearchUsers() {
  const setSearchUserDialogState = useSetRecoilState(SearchUserDialogStateAtom)
  return (
    <div className='w-12 flex-none'>
      <button
        onClick={() => {
          setSearchUserDialogState(true)
        }}
        aria-label='Search Users'
        className='ml-1  text-blue-500 transition duration-300 ease-in-out hover:text-blue-400  focus:text-blue-400 focus:outline-none  active:text-blue-400'>
        <SearchUsersIcon />
      </button>
    </div>
  )
}

