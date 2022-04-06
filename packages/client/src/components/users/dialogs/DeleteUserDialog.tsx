import { AnimatePresence, motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { DeleteUserDialogStateAtom } from '../../../recoil-state'
import { DeleteUserContent } from './content'
import { DialogHeader } from './header'

export default function DeleteUserDialog() {
  const [deleteUserDialogState, setDeleteUserDialogState] =
    useRecoilState(DeleteUserDialogStateAtom)

  const closeDialog = (event: any) => {
    if (event.keyCode === 27 || event.currentTarget === event.target) {
      setDeleteUserDialogState(false)
    }
  }

  window.addEventListener('keydown', (event) => closeDialog(event))

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delayChildren: 0.5, staggerChildren: 0.5 }}>
        {deleteUserDialogState && (
          <>
            <div
              className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'
              onClick={(event) => closeDialog(event)}>
              <div className='relative my-6 mx-auto w-auto max-w-3xl'>
                <div className='relative flex w-full flex-col rounded bg-grey-700 shadow-lg outline-none focus:outline-none'>
                  <DialogHeader
                    title='Delete User'
                    onClick={() => setDeleteUserDialogState(false)}
                  />
                  <DeleteUserContent />
                </div>
              </div>
            </div>
            <div className='fixed inset-0 z-40 bg-black-100/40'></div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
