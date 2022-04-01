import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { layoutContainer } from '../../style'
import DialogContainer from './DialogContainer'

export default function AppLayout() {
  return (
    <div className='bg-[url("/assets/bg-user-pattern.png")] bg-fixed bg-top'>
      <div className='scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 scrollbar scrollbar-thin flex min-h-screen w-screen flex-col'>
        <motion.section variants={layoutContainer} initial='initial' animate='animate' exit='exit'>
          <Outlet />
          <DialogContainer />
        </motion.section>
      </div>
    </div>
  )
}
