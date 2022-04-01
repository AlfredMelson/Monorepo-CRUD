import { useSetRecoilState } from 'recoil'
import { EditUserDialogStateAtom } from '../../../recoil-state'
import { SettingsIcon } from '../../icons'

export default function EditUserButton() {
  const setEditUserDialogState = useSetRecoilState(EditUserDialogStateAtom)
  return (
    <div className='w-12 place-self-center'>
      <button
        onClick={() => {
          setEditUserDialogState(true)
        }}
        aria-label='Edit User'
        className=' text-blue-500 transition duration-300 ease-in-out hover:text-blue-400  focus:text-blue-400 focus:outline-none  active:text-blue-400'>
        <SettingsIcon />
      </button>
    </div>
  )
}

