import { useState } from 'react'
import { QueryClient } from 'react-query'
import { trpc } from '../hooks'

const client = new QueryClient()

const UserCreation = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
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

  return (
    <div className='mx-auto mt-10 max-w-6xl text-3xl'>
      <h6 className='text-xl font-semibold'>Create new user</h6>

      <div className='mt-10'>
        <input
          type='text'
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className='w-full rounded-lg border-2 border-gray-300 p-5'
          placeholder='Firstname'
        />
        <input
          type='text'
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className='w-full rounded-lg border-2 border-gray-300 p-5'
          placeholder='Lastname'
        />
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full rounded-lg border-2 border-gray-300 p-5'
          placeholder='Email'
        />
        <input
          type='text'
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className='w-full rounded-lg border-2 border-gray-300 p-5'
          placeholder='Street'
        />
        <input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className='w-full rounded-lg border-2 border-gray-300 p-5'
          placeholder='City'
        />
        <input
          type='text'
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className='w-full rounded-lg border-2 border-gray-300 p-5'
          placeholder='Country'
        />
      </div>

      <button onClick={onAdd}>Add user</button>
    </div>
  )
}

export default UserCreation
