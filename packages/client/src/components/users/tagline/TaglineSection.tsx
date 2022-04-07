import { AnimatePresence } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import {
  AddUserDialogStateAtom,
  DeleteUserDialogStateAtom,
  EditUserDialogStateAtom,
  SearchUserDialogStateAtom
} from '../../../recoil-state'
import { SearchSection } from '../search'
import Tagline from './Tagline'

export default function TaglineSection() {
  const searchUserDialogState = useRecoilValue(SearchUserDialogStateAtom)
  const addUserDialogState = useRecoilValue(AddUserDialogStateAtom)
  const editUserDialogState = useRecoilValue(EditUserDialogStateAtom)
  const deleteUserDialogState = useRecoilValue(DeleteUserDialogStateAtom)

  return (
    <>
      {!addUserDialogState && !editUserDialogState && !deleteUserDialogState && (
        <div className='grid h-36 grid-cols-1 grid-rows-1 content-center'>
          <AnimatePresence>
            {searchUserDialogState ? <SearchSection /> : <Tagline />}
          </AnimatePresence>
        </div>
      )}
    </>
  )
}
