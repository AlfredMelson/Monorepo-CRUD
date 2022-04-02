import { motion } from 'framer-motion'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { paginatedUserListAtom, selectedUserAtom } from '../../../recoil-state'
import { usersCardComponents, usersCardList, usersCardListContainer } from '../../../style'
import { IUser } from '../../../types/User'
import DeleteUserButton from './DeleteUserButton'
import EditUserButton from './EditUserButton'

const User = () => {
  const setSelectedUser = useSetRecoilState(selectedUserAtom)
  const paginatedUserList = useRecoilValue(paginatedUserListAtom)

  return (
    <motion.div variants={usersCardComponents} layout>
      <motion.ul variants={usersCardListContainer} role='list'>
        {paginatedUserList.map((user: IUser, index: number) => (
          <motion.li
            key={index}
            variants={usersCardList}
            onClick={() => setSelectedUser(user.userId)}
            className='user-list-group grid w-full grid-cols-[50px_160px_160px_40px_40px] place-content-between gap-2 py-4'>
            <div className='col-span-1 ml-4 grid h-10 w-10 grid-cols-1 place-items-center self-center rounded bg-gold-50'>
              <p className='lg font-bold uppercase text-black-100'>
                {user.firstname.substring(0, 1)}
                {user.lastname.substring(0, 1)}
              </p>
            </div>
            <div className='col-span-1 grid grid-cols-1 place-content-center'>
              <p className='text-md text-left capitalize text-gold-50'>
                {user.firstname} {user.lastname}
              </p>
              <p className='text-left text-sm text-white-50'>{user.email}</p>
            </div>
            <div className='col-span-1 grid grid-cols-1 place-content-center'>
              <p className='text-left text-sm capitalize text-white-100'>{user.street}</p>
              <p className='text-left text-sm capitalize text-white-100'>
                {user.city}, {user.country}
              </p>
            </div>
            <div className='col-span-1 grid grid-cols-1 place-content-center'>
              <EditUserButton />
            </div>
            <div className='col-span-1 mr-4 grid grid-cols-1 place-content-center'>
              <DeleteUserButton />
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}
export default User

