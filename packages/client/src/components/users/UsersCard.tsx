import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { trpc } from '../../hooks'
import { userStateAtom } from '../../recoil-state'
import { usersCardHeading, usersCardPanel, usersCardTagline } from '../../style'
import { PanelControls } from './controls'
import { HeaderSection } from './header'
import { UsersListed } from './panel'

const UsersCard = () => {
  const setUserState = useSetRecoilState(userStateAtom)
  const results = trpc.useQuery(['getUsers'], { suspense: true })

  useEffect(() => {
    if (results.data) {
      setUserState(results.data)
    }
  }, [results.data, setUserState])

  return (
    <>
      <motion.div variants={usersCardHeading}>
        <HeaderSection />
      </motion.div>
      <motion.h6
        variants={usersCardTagline}
        className='mt-8 mb-14 text-2xl font-semibold text-white-50'>
        Current User List
      </motion.h6>

      <motion.div variants={usersCardPanel}>
        <UsersListed />
      </motion.div>

      <PanelControls />
    </>
  )
}
export default UsersCard
