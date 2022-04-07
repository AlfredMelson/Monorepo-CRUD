import { motion } from 'framer-motion'
import { useSetRecoilState } from 'recoil'
import { AddUserDialogStateAtom } from '../../../recoil-state'
import { DeleteUserIcon, SettingsIcon } from '../../icons'
import { AddUserContent } from './content'
import { DialogHeader } from './header'

export default function AddUserDialog() {
  const setAddUserDialogState = useSetRecoilState(AddUserDialogStateAtom)

  const closeDialog = (event: any) => {
    if (event.keyCode === 27 || event.currentTarget === event.target) {
      setAddUserDialogState(false)
    }
  }

  window.addEventListener('keydown', (event) => closeDialog(event))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.5, duration: 0.5, ease: [0.6, 0.66, 0.04, 1] }
      }}
      exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.5, ease: [0.6, 0.66, 0.04, 1] } }}
      className='grid  grid-cols-1 place-content-between gap-2 rounded-sm bg-grey-700 py-4 shadow-lg outline-none focus:outline-none'
      onClick={(event) => closeDialog(event)}>
      <DialogHeader title='Add New User' onClick={() => setAddUserDialogState(false)} />
      <AddUserContent />
    </motion.div>
  )
}
