import { AnimatePresence } from 'framer-motion'
import { Suspense, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useUser } from '../../hooks'
import {
  AddUserDialogStateAtom,
  DeleteUserDialogStateAtom,
  EditUserDialogStateAtom
} from '../../recoil-state'
import { trpc } from '../../utils'
import { PanelControls } from './controls'
import { DeleteUserDialog } from './dialogs'
import { HeaderSection } from './header'
import { UserSkeleton } from './skeleton'
import { DialogReplacement, TaglineSection } from './tagline'
import { User } from './user'

const UsersCard = () => {
  const addUserDialogState = useRecoilValue(AddUserDialogStateAtom)
  const editUserDialogState = useRecoilValue(EditUserDialogStateAtom)

  const { setAllUsers } = useUser()

  const deleteUserDialogState = useRecoilValue(DeleteUserDialogStateAtom)

  const response = trpc.useQuery(['user.getAll'])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    if (response.data) {
      setAllUsers(response.data)
    }
    setTimeout(function () {
      setIsLoading(false)
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Suspense fallback={<UserSkeleton />}>
      <HeaderSection />
      <AnimatePresence>
        {!addUserDialogState && !editUserDialogState ? (
          <>
            <TaglineSection />
            {isLoading ? <UserSkeleton /> : <User />}
            {deleteUserDialogState ? <DeleteUserDialog /> : <PanelControls />}
          </>
        ) : (
          <DialogReplacement />
        )}
      </AnimatePresence>
    </Suspense>
  )
}
export default UsersCard
