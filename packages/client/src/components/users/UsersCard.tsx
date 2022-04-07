import { AnimatePresence } from 'framer-motion'
import { Suspense, useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  AddUserDialogStateAtom,
  DeleteUserDialogStateAtom,
  EditUserDialogStateAtom,
  userStateAtom
} from '../../recoil-state'
import { trpc } from '../../utils'
import { PanelControls } from './controls'
import { HeaderSection } from './header'
import { UserSkeleton } from './skeleton'
import { TaglineSection } from './tagline'
import DialogSection from './tagline/DialogSection'
import { User } from './user'

const UsersCard = () => {
  const addUserDialogState = useRecoilValue(AddUserDialogStateAtom)
  const editUserDialogState = useRecoilValue(EditUserDialogStateAtom)
  const deleteUserDialogState = useRecoilValue(DeleteUserDialogStateAtom)
  const setUserState = useSetRecoilState(userStateAtom)

  const response = trpc.useQuery(['user.getAll'])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    if (response.data) {
      setUserState(response.data)
    }
    setTimeout(function () {
      setIsLoading(false)
    }, 1000)
  }, [response.data, setUserState])

  console.log('isLoading', isLoading)

  return (
    <Suspense fallback={<UserSkeleton />}>
      <HeaderSection />
      <AnimatePresence>
        {!addUserDialogState && !editUserDialogState && !deleteUserDialogState ? (
          <>
            <TaglineSection />
            {isLoading ? <UserSkeleton /> : <User />}
            <PanelControls />
          </>
        ) : (
          <DialogSection />
        )}
      </AnimatePresence>
    </Suspense>
  )
}
export default UsersCard
