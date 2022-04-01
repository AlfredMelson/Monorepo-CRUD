import { motion } from 'framer-motion'
import { userListCollocate, userListPaginate } from '../../../style'
import Collocation from './Collocation'
import Pagination from './Pagination'

export default function PanelControls() {
  return (
    <div className='mb-0 grid w-full grid-cols-2 px-6 pt-3 pb-0'>
      <motion.div variants={userListCollocate} className='col-span-1 col-start-1'>
        <Collocation />
      </motion.div>
      <motion.div variants={userListPaginate} className='col-span-1 col-start-2'>
        <Pagination />
      </motion.div>
    </div>
  )
}
