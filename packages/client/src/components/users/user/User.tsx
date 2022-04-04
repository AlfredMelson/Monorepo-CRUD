import { AnimatePresence, motion } from 'framer-motion'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { paginatedUserListAtom, selectedUserAtom } from '../../../recoil-state'
import { IUser } from '../../../types/User'
import { AvailableCountries } from '../dialogs/inputs/countries'
import DeleteUserButton from './DeleteUserButton'
import EditUserButton from './EditUserButton'

const User = () => {
  const setSelectedUser = useSetRecoilState(selectedUserAtom)
  const paginatedUserList = useRecoilValue(paginatedUserListAtom)

  return (
    <motion.ul layout>
      <AnimatePresence>
        {paginatedUserList.map((user: IUser, index: number) => (
          <motion.li
            key={index}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => setSelectedUser(user.userId)}
            className='user-list-group grid grid-cols-[50px_200px_200px_30px_30px] place-content-between gap-2 py-4 '>
            <div className='col-span-1 ml-4 grid h-10 w-10 grid-cols-1 place-items-center self-center rounded bg-gold-50'>
              <p className='lg font-bold uppercase text-black-100'>
                {user.firstname.substring(0, 1)}
                {user.lastname.substring(0, 1)}
              </p>
            </div>
            <div className='col-span-1 ml-4 grid grid-cols-1'>
              <p className='text-md text-left capitalize text-gold-50'>
                {user.firstname} {user.lastname}
              </p>
              <p className='text-left text-sm text-white-50'>{user.email}</p>
            </div>
            <div className='col-span-1 ml-4 grid grid-cols-1'>
              <p className='text-left text-sm capitalize text-white-100'>{user.street}</p>
              <p className='text-left text-sm capitalize text-white-100'>
                {user.city},{' '}
                {AvailableCountries.find((option) => option.value === user.country)?.title}
              </p>
            </div>
            <div className='col-span-1 grid grid-cols-1 place-content-center text-left'>
              <EditUserButton />
            </div>
            <div className='col-span-1 mr-2 grid grid-cols-1 place-content-center'>
              <DeleteUserButton />
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  )
}
export default User

