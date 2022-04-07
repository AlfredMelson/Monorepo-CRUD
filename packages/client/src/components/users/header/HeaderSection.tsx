import { useRecoilValue } from 'recoil'
import { AddUserDialogStateAtom, EditUserDialogStateAtom } from '../../../recoil-state'
import AddUser from './AddUser'
import LogoAppName from './LogoAppName'
import SearchUsers from './SearchUsers'

export default function HeaderSection() {
  const addUserDialogState = useRecoilValue(AddUserDialogStateAtom)
  const editUserDialogState = useRecoilValue(EditUserDialogStateAtom)
  return (
    <div className='flex w-full px-4 pt-6 pb-2'>
      <LogoAppName />
      {!addUserDialogState && !editUserDialogState && (
        <>
          <AddUser />
          <SearchUsers />
        </>
      )}
    </div>
  )
}
