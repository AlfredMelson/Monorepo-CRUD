/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userStateAtom } from '../recoil-state'
import { IUser } from '../types/User'
import { trpc } from '../utils'

export interface Users {
  allUsers: IUser[]
  userDeletion: (userId: string) => void
  isLoading: boolean
  error: string
}

const UserContext = createContext<Users>({
  allUsers: [],
  userDeletion: () => {},
  isLoading: false,
  error: ''
})

export const useUsersContext = () => useContext(UserContext)

// const UserContext = createContext<Record<string, any>>({})

interface IUserProvider {
  children: ReactNode
}
function DbUser() {
  const response = trpc.useQuery(['user.getAll'])
  return response
}

export const UserProvider = ({ children }: IUserProvider) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const userState = useRecoilValue(userStateAtom)
  const [allUsers, setAllUsers] = useState<IUser[]>([])

  //delete user from state with userId
  const userDeletion = (userId: string) => {
    const newUsers = allUsers.filter((user) => user.userId !== userId)
    setAllUsers(newUsers)
  }

  useEffect(() => {
    if (userState) {
      setAllUsers(userState)
    }
  }, [userState])

  return (
    <UserContext.Provider value={{ allUsers, userDeletion, isLoading, error }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
