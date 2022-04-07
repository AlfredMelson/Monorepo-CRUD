import { AnimatePresence } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import {
  AddUserDialogStateAtom,
  DeleteUserDialogStateAtom,
  EditUserDialogStateAtom,
  SearchUserDialogStateAtom
} from '../../../recoil-state'
import { AddUserDialog, DeleteUserDialog, EditUserDialog } from '../dialogs'

export default function DialogSection() {
  const searchUserDialogState = useRecoilValue(SearchUserDialogStateAtom)
  const addUserDialogState = useRecoilValue(AddUserDialogStateAtom)
  const editUserDialogState = useRecoilValue(EditUserDialogStateAtom)
  const deleteUserDialogState = useRecoilValue(DeleteUserDialogStateAtom)

  return (
    <div className='grid  grid-cols-1 grid-rows-1 content-center'>
      <AnimatePresence>
        {addUserDialogState && <AddUserDialog />}
        {editUserDialogState && <EditUserDialog />}
        {deleteUserDialogState && <DeleteUserDialog />}
      </AnimatePresence>
    </div>
  )
}
