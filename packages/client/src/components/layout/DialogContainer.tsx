import { useRecoilValue } from 'recoil'
import {
  AddUserDialogStateAtom,
  DeleteUserDialogStateAtom,
  EditUserDialogStateAtom,
  SearchUserDialogStateAtom
} from '../../recoil-state'
import { AddUserDialog, DeleteUserDialog, EditUserDialog, SearchUserDialog } from '../users/dialogs'

export default function DialogContainer() {
  const addUserDialogState = useRecoilValue(AddUserDialogStateAtom)
  const searchUserDialogState = useRecoilValue(SearchUserDialogStateAtom)
  const editUserDialogState = useRecoilValue(EditUserDialogStateAtom)
  const deleteUserDialogState = useRecoilValue(DeleteUserDialogStateAtom)
  return (
    <>
      {addUserDialogState && <AddUserDialog />}
      {searchUserDialogState && <SearchUserDialog />}
      {editUserDialogState && <EditUserDialog />}
      {deleteUserDialogState && <DeleteUserDialog />}
    </>
  )
}
