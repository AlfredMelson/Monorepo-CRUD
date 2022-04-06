import { useSetRecoilState } from 'recoil'
import { DeleteUserDialogStateAtom, userIdSelectedAtom } from '../../../recoil-state'
import { DeleteUserIcon } from '../../icons'

interface IDeleteUserButton {
  userId: string
}

export default function DeleteUserButton({ userId }: IDeleteUserButton) {
  const setDeleteUserDialogState = useSetRecoilState(DeleteUserDialogStateAtom)
  const setUserIdSelected = useSetRecoilState(userIdSelectedAtom)

  return (
    <div className='w-12 place-self-end'>
      <button
        onClick={() => {
          setDeleteUserDialogState(true)
          setUserIdSelected(userId)
        }}
        aria-label='Delete User'
        className=' text-blue-500 transition duration-300 ease-in-out hover:text-blue-400  focus:text-blue-400 focus:outline-none  active:text-blue-400'>
        <DeleteUserIcon />
      </button>
    </div>
  )
}

