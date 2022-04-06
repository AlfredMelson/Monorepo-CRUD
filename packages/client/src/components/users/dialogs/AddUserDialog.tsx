import { AnimatePresence, motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { AddUserDialogStateAtom } from '../../../recoil-state'
import { AddUserContent } from './content'
import { DialogHeader } from './header'

export default function AddUserDialog() {
  const [addUserDialogState, setAddUserDialogState] = useRecoilState(AddUserDialogStateAtom)

  const closeDialog = (event: any) => {
    if (event.keyCode === 27 || event.currentTarget === event.target) {
      setAddUserDialogState(false)
    }
  }

  window.addEventListener('keydown', (event) => closeDialog(event))

  return (
    <AnimatePresence>
      {addUserDialogState && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.3, duration: 0.5, ease: [0.6, 0.66, 0.04, 1] }
            }}
            exit={{
              opacity: 0,
              y: 16,
              transition: { duration: 0.5, ease: [0.6, 0.66, 0.04, 1] }
            }}
            className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'
            onClick={(event) => closeDialog(event)}>
            <div className='relative my-6 mx-auto w-auto max-w-3xl'>
              <div className='relative flex w-full flex-col rounded bg-grey-700 shadow-lg outline-none focus:outline-none'>
                <DialogHeader title='Add New User' onClick={() => setAddUserDialogState(false)} />
                <AddUserContent />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, ease: [0.6, 0.66, 0.04, 1] } }}
            exit={{
              opacity: 0,
              transition: { delay: 0.3, duration: 0.5, ease: [0.6, 0.66, 0.04, 1] }
            }}
            className='fixed inset-0 z-40 bg-black-100/40'></motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
