import { motion } from 'framer-motion'
import { QueryClient } from 'react-query'
import { useRecoilValue } from 'recoil'
import { userIdSelectedAtom } from '../../../../recoil-state'
import { inputFieldTitle } from '../../../../style'
import { trpc } from '../../../../utils'
import { DeleteUser } from '../submissions'

export default function DeleteUserContent() {
  const userIdSelected = useRecoilValue(userIdSelectedAtom)

  const client = new QueryClient()

  const deleteUser = trpc.useMutation('user.delete')

  const onDelete = async () => {
    try {
      const userId = userIdSelected
      console.log('userId', userId)
      deleteUser.mutate(
        { userId },
        {
          onSuccess: () => {
            client.invalidateQueries(['user.getAll'])
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='opacity-100'>
      <motion.div variants={inputFieldTitle}>
        <div className='grid grid-cols-4'>
          <motion.div
            variants={inputFieldTitle}
            className='col-span-2 col-start-1 row-start-1 pr-8'>
            <h6 className='mt-4 mr-0 mb-1 ml-2'>Are you sure?</h6>
          </motion.div>

          <div className='col-start-4 row-start-6'>
            <DeleteUser
              onClick={onDelete}
              btnText='Delete'
              // submitting={submitting}
              // successSubmit={successSubmit}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
