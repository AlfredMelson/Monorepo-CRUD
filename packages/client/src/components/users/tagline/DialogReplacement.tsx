import { AnimatePresence } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { AddUserDialogStateAtom, EditUserDialogStateAtom } from '../../../recoil-state'
import { AddUserDialog, EditUserDialog } from '../dialogs'

export default function DialogReplacement() {
  const addUserDialogState = useRecoilValue(AddUserDialogStateAtom)
  const editUserDialogState = useRecoilValue(EditUserDialogStateAtom)

  return (
    <div className='grid grid-cols-1 grid-rows-1 content-center'>
      <AnimatePresence>
        {addUserDialogState && <AddUserDialog />}
        {editUserDialogState && <EditUserDialog />}
      </AnimatePresence>
    </div>
  )
}
