import { motion } from 'framer-motion'
import { createRef, SetStateAction, useEffect, useState } from 'react'
import { QueryClient } from 'react-query'
import { trpc } from '../../../../hooks'
import { inputFieldTitle } from '../../../../style'
import { REGEX_Username, regexEmailValidation } from '../../../../utils'
import { AvailableCountries, IAvailableCountries } from '../inputs/countries'
import { CountrySelector } from '../inputs/CountrySelector'
import AddEmployee from '../submissions/AddEmployee'

export default function AddUserContent() {
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
  const [country, setCountry] = useState('LT')
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

  const myRef = createRef<HTMLDivElement>()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative flex-auto p-6 opacity-100'>
      <motion.div variants={inputFieldTitle}>
        <div className='mx-1 grid grid-cols-2 gap-x-5 gap-y-4'>
          <motion.div variants={inputFieldTitle} className='col-span-1 col-start-1 row-start-1'>
            <p className='mt-2 -mb-2 ml-3'>First name</p>
          </motion.div>
          <div className='col-span-1 col-start-1 row-start-2  w-52'>
            <input
              autoFocus
              id='firstname'
              placeholder='First name'
              value={firstname}
              onChange={(event: { target: { value: SetStateAction<string> } }) => {
                setFirstname(event.target.value)
              }}
              // error={firstnameHelperText !== ''}
              // helperText={firstnameHelperText}

              className='relative w-full cursor-default rounded bg-black-100 py-2 pl-3 text-left shadow-sm focus:border-gold-50 focus:outline-none focus:ring-1 focus:ring-gold-50'
            />
          </div>
          <motion.div variants={inputFieldTitle} className='col-span-1 col-start-2 row-start-1'>
            <p className='mt-2 -mb-2 ml-2'>Last name</p>
          </motion.div>
          <div className='col-span-1 col-start-2 row-start-2 w-52'>
            <input
              id='lastname'
              placeholder='Last name'
              value={lastname}
              onChange={(event: { target: { value: SetStateAction<string> } }) => {
                setLastname(event.target.value)
              }}
              // error={lastnameHelperText !== ''}
              // helperText={lastnameHelperText}
              className='relative w-full cursor-default rounded bg-black-100 py-2 pl-3 text-left shadow-sm focus:border-gold-50 focus:outline-none focus:ring-1 focus:ring-gold-50'
            />
          </div>
          <motion.div variants={inputFieldTitle} className='col-span-1 col-start-1 row-start-3'>
            <p className='mt-2 -mb-2 ml-2'>Email Address</p>
          </motion.div>
          <div className='col-span-2 col-start-1 row-start-4 w-80'>
            <input
              id='email'
              placeholder='Email Address'
              value={email}
              onChange={(event: { target: { value: SetStateAction<string> } }) => {
                setEmail(event.target.value)
              }}
              // error={emailHelperText !== ''}
              // helperText={emailHelperText}

              className='relative w-full cursor-default rounded bg-black-100 py-2 pl-3 text-left shadow-sm focus:border-gold-50 focus:outline-none focus:ring-1 focus:ring-gold-50'
            />
          </div>
          <motion.div variants={inputFieldTitle} className='col-span-1 col-start-1 row-start-5'>
            <h6 className='mt-2 -mb-2 ml-2'>Street</h6>
          </motion.div>
          <div className='col-span-2 col-start-1 row-start-6 w-80'>
            <input
              id='street'
              placeholder='Street'
              value={street}
              onChange={(event: { target: { value: SetStateAction<string> } }) => {
                setStreet(event.target.value)
              }}
              // error={streetHelperText !== ''}
              // helperText={emailHelperText}
              className='relative w-full cursor-default rounded bg-black-100 py-2 pl-3 text-left shadow-sm focus:border-gold-50 focus:outline-none focus:ring-1 focus:ring-gold-50'
            />
          </div>
          <motion.div variants={inputFieldTitle} className='col-span-1 col-start-1 row-start-7'>
            <h6 className='mt-2 -mb-2 ml-2'>City</h6>
          </motion.div>
          <div className='row-start-8 col-span-1 col-start-1 w-52'>
            <input
              id='city'
              placeholder='City'
              value={city}
              onChange={(event: { target: { value: SetStateAction<string> } }) => {
                setCity(event.target.value)
              }}
              // error={cityHelperText !== ''}
              // helperText={cityHelperText}
              className='relative w-full cursor-default rounded bg-black-100 py-2 pl-3 text-left shadow-sm focus:border-gold-50 focus:outline-none focus:ring-1 focus:ring-gold-50'
            />
          </div>
          <motion.div variants={inputFieldTitle} className='col-span-1 col-start-2 row-start-7'>
            <h6 className='mt-2 -mb-2 ml-2'>Country</h6>
          </motion.div>

          <div className='row-start-8 col-span-1 col-start-2 w-52'>
            <CountrySelector
              id={'countries'}
              ref={myRef}
              open={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
              onChange={(val) => setCountry(val)}
              selectedValue={
                AvailableCountries.find((option) => option.value === country) as IAvailableCountries
              }
            />
          </div>
          <div className='row-start-11 col-start-2 text-center'>
            <AddEmployee
              verified={formValidation}
              onClick={onAdd}
              btnText='Add User'
              // submitting={submitting}
              // successSubmit={successSubmit}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
