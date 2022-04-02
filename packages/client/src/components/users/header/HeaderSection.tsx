import { motion } from 'framer-motion'
import { usersCardComponents } from '../../../style'
import AddUser from './AddUser'
import LogoAppName from './LogoAppName'
import SearchUsers from './SearchUsers'

export default function HeaderSection() {
  return (
    <motion.div variants={usersCardComponents} className='flex w-full p-4'>
      <LogoAppName />
      <AddUser />
      <SearchUsers />
    </motion.div>
  )
}

