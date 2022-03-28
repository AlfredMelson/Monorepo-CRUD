import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { layoutContainer } from '../../style'

export default function AppLayout() {
  return (
    <motion.section
      className='layout-background'
      variants={layoutContainer}
      initial='initial'
      animate='animate'
      exit='exit'>
      <Outlet />
    </motion.section>
  )
}
