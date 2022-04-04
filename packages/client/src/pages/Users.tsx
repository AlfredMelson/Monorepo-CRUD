import { motion } from 'framer-motion'
import { Suspense } from 'react'
import { UsersCard } from '../components'
import { usersCardContainer } from '../style'

const Users = () => {
  return (
    <Suspense fallback={<h1>Loading posts...</h1>}>
      <motion.div
        variants={usersCardContainer}
        initial='hidden'
        animate='visible'
        className='xs:w-full xs:mx-2 mx-auto mt-14 grid grid-cols-1 rounded bg-grey-800 py-1 px-4 text-center shadow-lg'>
        <UsersCard />
      </motion.div>
    </Suspense>
  )
}

export default Users
