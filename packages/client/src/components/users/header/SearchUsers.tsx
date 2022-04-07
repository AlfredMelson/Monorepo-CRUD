import { useRecoilState } from 'recoil'
import { SearchUserDialogStateAtom } from '../../../recoil-state'
import { SearchUsersIcon } from '../../icons'

export default function SearchUsers() {
  const [searchUserDialogState, setSearchUserDialogState] =
    useRecoilState(SearchUserDialogStateAtom)
  return (
    <div className='w-12 place-self-center'>
      <button
        onClick={() => {
          setSearchUserDialogState(true)
        }}
        aria-label='Search Users'
        className='text-blue-500 transition duration-300 ease-in-out hover:text-blue-400  focus:text-blue-400 focus:outline-none active:text-blue-400'>
        {!searchUserDialogState ? (
          <SearchUsersIcon />
        ) : (
          <span className='cursor-default text-grey-800 transition duration-300 ease-in-out'>
            <SearchUsersIcon />
          </span>
        )}
      </button>
    </div>
  )
}
