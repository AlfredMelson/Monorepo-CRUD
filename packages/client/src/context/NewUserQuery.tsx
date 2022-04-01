import { QueryClient } from 'react-query'
import { trpc } from '../hooks'

export const newUser = (user: {
  firstname: string
  lastname: string
  email: string
  street: string
  city: string
  country: string
}) => {
  const client = new QueryClient()
  const { firstname, lastname, email, street, city, country } = user

  try {
    const addUser = trpc.useMutation('addUser')
    const onAdd = () => {
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
            client.invalidateQueries(['getUsers'])
          }
        }
      )
    }
  } catch (error) {
    console.log((error as Error).message)
  }
}
