import { motion } from 'framer-motion'
import { SetStateAction, useEffect, useState } from 'react'
import { QueryClient } from 'react-query'
import { trpc } from '../../../../hooks'
import { inputFieldTitle } from '../../../../style'
import { REGEX_Username, regexEmailValidation } from '../../../../utils'
import AddEmployee from '../submissions/AddEmployee'

export default function SearchUserContent() {
  // update email dialog state
  // const setAddEmplDialogState = useSetRecoilState(AddEmplDialogStateAtom)

  const client = new QueryClient()

  // firstname input state
  const [firstname, setFirstname] = useState('')
  const [firstnameHelperText, setFirstnameHelperText] = useState<string>('')

  // lastname input state
  const [lastname, setLastname] = useState('')
  const [lastnameHelperText, setLastnameHelperText] = useState<string>('')

  // email  input state
  const [email, setEmail] = useState('')
  const [emailHelperText, setEmailHelperText] = useState<string>('')

  // street input state
  const [street, setStreet] = useState('')
  const [streetHelperText, setStreetHelperText] = useState<string>('')

  // city input state
  const [city, setCity] = useState('')
  const [cityHelperText, setCityHelperText] = useState<string>('')

  // country input state
  const [country, setCountry] = useState('')
  const [countryHelperText, setCountryHelperText] = useState<string>('')

  console.log(
    firstnameHelperText,
    lastnameHelperText,
    emailHelperText,
    streetHelperText,
    cityHelperText,
    countryHelperText
  )
  // email address validation state
  const [emailValidation, setEmailValidation] = useState<boolean>(false)

  // completed form validation state
  const [formValidation, setFormValidation] = useState<boolean>(false)

  // handle form validation state
  useEffect(() => {
    const validFirstname: boolean = firstname !== '' && REGEX_Username.test(firstname)
    const validLastname: boolean = lastname !== '' && REGEX_Username.test(lastname)
    const validEmail: boolean = regexEmailValidation.test(email.toLowerCase())
    // validate country against api
    // const validCountry: boolean = emplRole === 'Read' || 'Write' || 'Admin'
    if (validFirstname && validLastname && validEmail)
      return () => {
        setFormValidation(true)
      }
  }, [emailValidation, email, firstname, lastname, street, city, country])

  // handle setting and updating error message and state
  useEffect(() => {
    return () => {
      // reset alert when either the firstname, lastname or password state changes
      setFirstnameHelperText('')
      setLastnameHelperText('')
      setEmailHelperText('')
      setStreetHelperText('')
      setCityHelperText('')
      setCountryHelperText('')
      setFormValidation(false)
    }
  }, [email])

  // handle email address input validation
  useEffect(() => {
    const validateEmail = regexEmailValidation.test(email.toLowerCase())
    setEmailValidation(!validateEmail)
  }, [email])

  // const handleAddEmpl = (event: any) => {
  //   event.preventDefault()

  // alert user if email address input is empty
  // if (!email) {
  //   return setEmailHelperText('Please enter an email')
  // }

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

  const roles = [
    {
      value: '',
      label: 'Role'
    },
    {
      value: 'read',
      label: 'Read'
    },
    {
      value: 'write',
      label: 'Write'
    },
    {
      value: 'admin',
      label: 'Admin'
    }
  ]

  return (
    <div className='opacity-100'>
      <motion.div variants={inputFieldTitle}>
        <div className='grid grid-cols-4'>
          <motion.div
            variants={inputFieldTitle}
            className='col-span-2 col-start-1 row-start-1 pr-8'>
            <h6 className='mt-4 mr-0 mb-1 ml-2'>First name</h6>
          </motion.div>
          <input
            autoFocus
            id='firstname'
            placeholder='First name'
            value={firstname}
            // error={firstnameHelperText !== ''}
            onChange={(event: { target: { value: SetStateAction<string> } }) => {
              setFirstname(event.target.value)
            }}
            // helperText={firstnameHelperText}
            className='col-span-2 row-start-2 pr-8'
          />
          <motion.div variants={inputFieldTitle} className='col-span-2 col-start-3 row-start-1'>
            <h6 className='mt-4 mr-0 mb-1 ml-2'>Last name</h6>
          </motion.div>
          <input
            id='lastname'
            placeholder='Last name'
            value={lastname}
            // error={lastnameHelperText !== ''}
            onChange={(event: { target: { value: SetStateAction<string> } }) => {
              setLastname(event.target.value)
            }}
            // helperText={lastnameHelperText}
            className='col-span-2 col-start-3 row-start-2'
          />
          <motion.div variants={inputFieldTitle} className='col-span-3 col-start-1 row-start-3'>
            <h6 className='mt-4 mr-0 mb-1 ml-2'>Email Address</h6>
          </motion.div>
          <input
            id='email'
            placeholder='Email Address'
            value={email}
            // error={emailHelperText !== ''}
            onChange={(event: { target: { value: SetStateAction<string> } }) => {
              setEmail(event.target.value)
            }}
            // helperText={emailHelperText}
            className='col-span-3 row-start-1 pr-4'
          />
          <motion.div variants={inputFieldTitle} className='col-span-3 col-start-1 row-start-4'>
            <h6 className='mt-4 mr-0 mb-1 ml-2'>Street</h6>
          </motion.div>
          <input
            id='street'
            placeholder='Street'
            value={street}
            // error={streetHelperText !== ''}
            onChange={(event: { target: { value: SetStateAction<string> } }) => {
              setStreet(event.target.value)
            }}
            // helperText={emailHelperText}
            className='col-span-3 row-start-1 pr-4'
          />
          <motion.div variants={inputFieldTitle} className='col-span-3 col-start-1 row-start-5'>
            <h6 className='mt-4 mr-0 mb-1 ml-2'>City</h6>
          </motion.div>
          <input
            id='city'
            placeholder='City'
            value={city}
            // error={cityHelperText !== ''}
            onChange={(event: { target: { value: SetStateAction<string> } }) => {
              setCity(event.target.value)
            }}
            // helperText={cityHelperText}
            className='col-span-3 col-start-1 row-start-5 pr-4'
          />
          <motion.div variants={inputFieldTitle} className='col-start-4 row-start-6'>
            <h6 className='mt-4 mr-0 mb-1 ml-2'>Country</h6>
          </motion.div>

          <div className='col-start-4 row-start-5'>
            <select
              id='country'
              value={country}
              onChange={(event: { target: { value: SetStateAction<string> } }) => {
                setCountry(event.target.value)
              }}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'>
              {roles.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/* </input> */}
          <div className='col-start-4 row-start-6'>
            <AddEmployee
              verified={formValidation}
              onClick={onAdd}
              btnText='Add'
              // submitting={submitting}
              // successSubmit={successSubmit}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
