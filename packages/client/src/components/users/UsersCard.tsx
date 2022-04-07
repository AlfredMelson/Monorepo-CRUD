import { AnimatePresence, motion } from 'framer-motion'
import { Suspense } from 'react'
import { Loading } from '../layout/Loading'
import { PanelControls } from './controls'
import { HeaderSection } from './header'
import { TaglineSection } from './tagline'
import { User } from './user'

const UsersCard = () => {
  return (
    <>
      <HeaderSection />
      <TaglineSection />
      <Suspense fallback={<Loading />}>
        <AnimatePresence>
          <User />
        </AnimatePresence>
      </Suspense>
      <PanelControls />
    </>
  )
}
export default UsersCard
