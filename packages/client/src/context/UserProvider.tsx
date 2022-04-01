/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userStateAtom } from '../recoil-state'
import { IUser } from '../types/User'

export interface Users {
  allUsers: IUser[]
  setAllUsers: any
}

const UserContext = createContext<Users>({
  allUsers: [],
  setAllUsers: []
})

export const useUsersContext = () => useContext(UserContext)

// const UserContext = createContext<Record<string, any>>({})

interface IUserProvider {
  children: ReactNode
}

export const UserProvider = ({ children }: IUserProvider) => {
  const [allUsers, setAllUsers] = useState<IUser[]>([])
  const userState = useRecoilValue(userStateAtom)

  useEffect(() => {
    setAllUsers(userState)
  }, [userState])

  return <UserContext.Provider value={{ allUsers, setAllUsers }}>{children}</UserContext.Provider>
}

export default UserContext
