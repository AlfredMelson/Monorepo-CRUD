import { QueryClient } from 'react-query'
import { IUser } from '../types/User'
import { trpc } from '../utils'

export const newUser = (user: IUser) => {
  const client = new QueryClient()
  const { firstname, lastname, email, street, city, country } = user

  try {
    const addUser = trpc.useMutation('user.add')

    addUser.mutate(
      {
        firstname,
        lastname,
        email,
        street,
        city,
        country
      },
      {
        onSuccess: () => {
          client.invalidateQueries(['user.getAll'])
        }
      }
    )
  } catch (error) {
    console.log((error as Error).message)
  }
}
