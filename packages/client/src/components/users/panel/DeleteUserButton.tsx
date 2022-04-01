import { useSetRecoilState } from 'recoil'
import { DeleteUserDialogStateAtom } from '../../../recoil-state'
import { DeleteUserIcon } from '../../icons'

export default function DeleteUserButton() {
  const setDeleteUserDialogState = useSetRecoilState(DeleteUserDialogStateAtom)
  return (
    <div className='w-12 place-self-end'>
      <button
        onClick={() => {
          setDeleteUserDialogState(true)
        }}
        aria-label='Delete User'
        className=' text-blue-500 transition duration-300 ease-in-out hover:text-blue-400  focus:text-blue-400 focus:outline-none  active:text-blue-400'>
        <DeleteUserIcon />
      </button>
    </div>
  )
}

