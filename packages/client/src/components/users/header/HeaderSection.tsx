import { motion } from 'framer-motion'
import { usersCardHeader } from '../../../style'
import AddUser from './AddUser'
import LogoAppName from './LogoAppName'
import SearchUsers from './SearchUsers'

export default function HeaderSection() {
  return (
    <motion.div variants={usersCardHeader} layout className='flex w-full px-4 pt-6 pb-2'>
      <LogoAppName />
      <AddUser />
      <SearchUsers />
    </motion.div>
  )
}

