import { AnimatePresence } from 'framer-motion'
import { Suspense, useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { userStateAtom } from '../../recoil-state'
import { trpc } from '../../utils'
import { PanelControls } from './controls'
import { HeaderSection } from './header'
import { TaglineSection } from './tagline'
import { User } from './user'
import UserSkeleton from './user/UserSkeleton'

const UsersCard = () => {
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
    }, 2000)
  }, [response.data, setUserState])

  console.log('isLoading', isLoading)

  return (
    <Suspense fallback={<UserSkeleton />}>
      <HeaderSection />
      <TaglineSection />
      <AnimatePresence>{isLoading ? <UserSkeleton /> : <User />}</AnimatePresence>
      <PanelControls />
    </Suspense>
  )
}
export default UsersCard
