import { useState } from 'react'
import { QueryClient } from 'react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useUser } from '../../../../hooks'
import { DeleteUserDialogStateAtom, userIdSelectedAtom } from '../../../../recoil-state'
import { trpc } from '../../../../utils'
import { DeleteUser } from '../submissions'

export default function DeleteUserContent() {
  const [checked, setChecked] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const userIdSelected = useRecoilValue(userIdSelectedAtom)
  const setDeleteUserDialogState = useSetRecoilState(DeleteUserDialogStateAtom)
  // const client = new QueryClient()
  const { userDeletion } = useUser()

  const deleteUser = trpc.useMutation('user.delete')

  const onDelete = async () => {
    setLoading(true)
    try {
      const userId = userIdSelected
      deleteUser.mutate(
        { userId },
        {
          onSuccess: () => {
            // client.invalidateQueries(['user.getAll'])
            setSuccess(true)
            setLoading(false)
            userDeletion(userId)
          }
        }
      )
      setTimeout(function () {
        setDeleteUserDialogState(false)
      }, 1000)
    } catch (error) {
      console.log(error)
      setSuccess(false)
      setLoading(false)
    }
  }

  return (
    <div className='mx-1 grid grid-cols-2 gap-x-5 gap-y-4 p-6'>
      <div className='col-span-1 col-start-1 row-start-1'>
        <label className='inline-flex items-center'>
          <input type='checkbox' className='h-6 w-6 rounded' onClick={() => setChecked(!checked)} />
          <span className='ml-2'>Are you sure? </span>
        </label>
      </div>

      {checked && (
        <div className='col-span-1 col-start-2 row-start-1'>
          <DeleteUser
            onClick={onDelete}
            submitting={loading}
            successful={success}
            btnText='Delete'
          />
        </div>
      )}
    </div>
  )
}
