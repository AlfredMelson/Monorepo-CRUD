import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { EditUserDialogStateAtom } from '../../../recoil-state'
import { usersCardHeading } from '../../../style'
import CloseIcon from '../../icons/CloseIcon'
import { AddEmplContent } from './content'
import { DialogHeader } from './header'

function EditUserDialog() {
  const [editUserDialogState, setEditUserDialogState] = useRecoilState(EditUserDialogStateAtom)

  const closeDialog = (event: any) => {
    if (event.keyCode === 27 || event.currentTarget === event.target) {
      setEditUserDialogState(false)
    }
  }

  window.addEventListener('keydown', (event) => closeDialog(event))

  return (
    <>
      {editUserDialogState && (
        <>
          <div
            className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'
            onClick={(event) => closeDialog(event)}>
            <div className='relative my-6 mx-auto w-auto max-w-3xl'>
              <div className='relative flex w-full flex-col rounded bg-grey-700 shadow-lg outline-none focus:outline-none'>
                <div className='flex items-start justify-between p-5'>
                  <motion.div variants={usersCardHeading}>
                    <DialogHeader title='Add New User' />
                  </motion.div>
                  <button
                    onClick={() => setEditUserDialogState(false)}
                    className='background-transparent mr-1 mb-1 px-6 py-2  text-blue-500 outline-none transition duration-300 ease-in-out hover:text-blue-400  focus:text-blue-400 focus:outline-none active:text-blue-400'
                    type='button'>
                    <CloseIcon />
                  </button>
                </div>
                <div className='relative flex-auto p-6'>
                  <AddEmplContent />
                </div>
                <div className='flex items-center justify-end rounded-b p-6'>
                  <button
                    className='mr-1 mb-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600'
                    type='button'>
                    Submit User
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
        </>
      )}
    </>
  )
}

export default EditUserDialog
