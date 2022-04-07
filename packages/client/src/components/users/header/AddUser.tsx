import { useSetRecoilState } from 'recoil'
import { AddUserDialogStateAtom } from '../../../recoil-state'
import { AddUserIcon } from '../../icons'

export default function AddUser() {
  const setAddUserDialogState = useSetRecoilState(AddUserDialogStateAtom)
  return (
    <div className='w-12 place-self-center'>
      <button
        onClick={() => {
          setAddUserDialogState(true)
        }}
        aria-label='Add New User'
        className='text-blue-500 transition duration-300 ease-in-out hover:text-blue-400  focus:text-blue-400 focus:outline-none active:text-blue-400'>
        <AddUserIcon />
      </button>
    </div>
  )
}
