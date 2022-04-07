import { Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { DeleteUserDialogStateAtom } from '../../recoil-state'
import { DeleteUserDialog } from '../users/dialogs'

export default function AppLayout() {
  const deleteUserDialogState = useRecoilValue(DeleteUserDialogStateAtom)
  return (
    <div className='bg-[url("/assets/bg-user-pattern.png")] bg-fixed bg-top'>
      <div className='scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 scrollbar scrollbar-thin flex min-h-screen w-screen flex-col'>
        <Outlet />
        {deleteUserDialogState && <DeleteUserDialog />}
      </div>
    </div>
  )
}
