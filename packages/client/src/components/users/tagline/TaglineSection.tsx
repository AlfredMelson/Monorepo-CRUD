import { LayoutGroup, motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { SearchUserDialogStateAtom } from '../../../recoil-state'
import { usersCardComponents } from '../../../style'
import CloseIcon from '../../icons/CloseIcon'

export default function TaglineSection() {
  const [searchUserDialogState, setSearchUserDialogState] =
    useRecoilState(SearchUserDialogStateAtom)

  return (
    <LayoutGroup>
      {searchUserDialogState ? (
        <motion.div
          variants={usersCardComponents}
          layout
          className='user-search grid-cols-[200px_200px_40px ] mt-8 mb-14 grid w-full place-content-between gap-2 py-4'>
          <div className='col-span-1 col-start-1 place-content-center'>
            <h6 className='text-md text-left capitalize text-gold-50'>firstname</h6>
          </div>
          <div className='col-span-1 col-start-2 place-content-center'>
            <h6 className='text-md text-left capitalize text-gold-50'>firstname</h6>
          </div>
          <div className='col-span-1 col-start-3 place-content-center'>
            <div className='w-12 place-self-center'>
              <button
                onClick={() => {
                  setSearchUserDialogState(false)
                }}
                aria-label='Close Search Area'
                className=' text-blue-500 transition duration-300 ease-in-out hover:text-blue-400  focus:text-blue-400 focus:outline-none  active:text-blue-400'>
                <CloseIcon />
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.h6
          variants={usersCardComponents}
          layout
          className='mt-8 mb-14 text-2xl font-semibold text-white-50'>
          Current User List
        </motion.h6>
      )}
    </LayoutGroup>
  )
}

