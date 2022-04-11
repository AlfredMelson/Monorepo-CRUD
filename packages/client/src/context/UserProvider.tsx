/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userStateAtom } from '../recoil-state'
import { IUser } from '../types/User'
import { trpc } from '../utils'

export interface Users {
  allUsers: IUser[]
  userAddition: (newUser: IUser) => void
  userUpdate: (newUser: IUser) => void
  userDeletion: (userId: string) => void
}

const UserContext = createContext<Users>({
  allUsers: [],
  userAddition: () => {},
  userUpdate: () => {},
  userDeletion: () => {}
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
  const userState = useRecoilValue(userStateAtom)
  const [allUsers, setAllUsers] = useState<IUser[]>([])

  useEffect(() => {
    if (userState) {
      setAllUsers(userState)
    }
  }, [userState])

  // delete user from state
  const userDeletion = (userId: string) => {
    const otherUsers = allUsers.filter((user) => user.userId !== userId)
    setAllUsers(otherUsers)
  }

  // add user to state
  const userAddition = (newUser: IUser) => {
    setAllUsers([...allUsers, newUser])
  }

  // edit user from state
  const userUpdate = (updatedUser: IUser) => {
    const { userId } = updatedUser
    const otherUsers = allUsers.filter((user) => user.userId !== userId)
    setAllUsers([...otherUsers, updatedUser])
  }

  return (
    <UserContext.Provider value={{ allUsers, userAddition, userDeletion, userUpdate }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
