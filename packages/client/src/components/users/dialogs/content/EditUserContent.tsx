import { motion } from 'framer-motion'
import { createRef, SetStateAction, useEffect, useState } from 'react'
import { QueryClient } from 'react-query'
import { useRecoilValue } from 'recoil'
import { userIdSelectedAtom, userStateAtom } from '../../../../recoil-state'
import { inputFieldTitle } from '../../../../style'
import { REGEX_Username, regexEmailValidation, trpc } from '../../../../utils'
import { allCountries, IAllCountries } from '../inputs/countries'
import { CountrySelector } from '../inputs/CountrySelector'
import { EditUser } from '../submissions'

export default function EditUserContent() {
  const userState = useRecoilValue(userStateAtom)
  const userIdSelected = useRecoilValue(userIdSelectedAtom)

  const userData = userState.filter((user) => user.userId === userIdSelected)

  const client = new QueryClient()

  // userId input state
  const [userId, setUserId] = useState('')

  // firstname input state
  const [firstname, setFirstname] = useState(userData[0].firstname)
  const [firstnameHelperText, setFirstnameHelperText] = useState<string>('')

  // lastname input state
  const [lastname, setLastname] = useState(userData[0].lastname)
  const [lastnameHelperText, setLastnameHelperText] = useState<string>('')

  // email  input state
  const [email, setEmail] = useState(userData[0].email)
  const [emailHelperText, setEmailHelperText] = useState<string>('')

  // street input state
  const [street, setStreet] = useState(userData[0].street)
  const [streetHelperText, setStreetHelperText] = useState<string>('')

  // city input state
  const [city, setCity] = useState(userData[0].city)
  const [cityHelperText, setCityHelperText] = useState<string>('')

  // country input state
  const [country, setCountry] = useState(userData[0].country)
  const [countryHelperText, setCountryHelperText] = useState<string>('')

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
  const editUser = trpc.useMutation('user.edit')

  const handleAddUser = async (event: any) => {
    event.preventDefault()

    // alert user if email address input is empty
    // if (!firstname) {
    //   return setEmailHelperText('Please enter an email')
    // }
    // // alert user if email address input is empty
    // if (!lastname) {
    //   return setEmailHelperText('Please enter an email')
    // }
    // // alert user if email address input is empty
    // if (!street) {
    //   return setEmailHelperText('Please enter an email')
    // }
    // // alert user if email address input is empty
    // if (!city) {
    //   return setEmailHelperText('Please enter an email')
    // }
    // // alert user if email address input is empty
    // if (!country) {
    //   return setEmailHelperText('Please enter an email')
    // }

    try {
      editUser.mutate(
        {
          userId,
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

      // update user list
      // notify user has been added
      // close dialog if positive response from server

      // open error alert if there is a caught error
    } catch (error) {
      console.log(error)
    }
  }

  const myRef = createRef<HTMLDivElement>()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative p-6 opacity-100'>
      <motion.div variants={inputFieldTitle}>
        <div className='mx-1 grid grid-cols-2 gap-x-5 gap-y-4'>
          <div className='col-span-1 col-start-1 row-start-1'>
            <label className='block'>
              <span className='mt-2 mb-2 ml-3 block text-left'>First name</span>
              <input
                id='firstname'
                placeholder='First name'
                value={firstname}
                onChange={(event: { target: { value: SetStateAction<string> } }) => {
                  setFirstname(event.target.value)
                }}
                className='peer relative w-full cursor-default rounded bg-black-100 py-2 pl-3 shadow-sm focus:border-gold-50 focus:outline-none focus:ring-1 focus:ring-gold-50'
              />
              {firstnameHelperText !== '' && (
                <p className='mt-1 ml-3 text-left text-sm italic text-red-500'>
                  {firstnameHelperText}
                </p>
              )}
            </label>
          </div>

          <div className='col-span-1 col-start-2 row-start-1'>
            <label className='block'>
              <span className='mt-2 mb-2 ml-3 block text-left'>Last name</span>
              <input
                id='lastname'
                placeholder='Last name'
                value={lastname}
                onChange={(event: { target: { value: SetStateAction<string> } }) => {
                  setLastname(event.target.value)
                }}
                className='peer relative w-full cursor-default rounded bg-black-100 py-2 pl-3 shadow-sm focus:border-gold-50 focus:outline-none focus:ring-1 focus:ring-gold-50'
              />
              {lastnameHelperText !== '' && (
                <p className='mt-1 ml-3 text-left text-sm italic text-red-500'>
                  {lastnameHelperText}
                </p>
              )}
            </label>
          </div>

          <div className='col-span-2 col-start-1 row-start-2 w-80'>
            <label className='block'>
              <span className='mt-2 mb-2 ml-3 block text-left'>Email</span>
              <input
                id='email'
                placeholder='Email Address'
                value={email}
                onChange={(event: { target: { value: SetStateAction<string> } }) => {
                  setEmail(event.target.value)
                }}
                className='peer relative w-full cursor-default rounded bg-black-100 py-2 pl-3 shadow-sm focus:border-gold-50 focus:outline-none focus:ring-1 focus:ring-gold-50'
              />
              {emailHelperText !== '' && (
                <p className='mt-1 ml-3 text-left text-sm italic text-red-500'>{emailHelperText}</p>
              )}
            </label>
          </div>

          <div className='col-span-2 col-start-1 row-start-3 w-80'>
            <label className='block'>
              <span className='mt-2 mb-2 ml-3 block text-left'>Street</span>
              <input
                id='street'
                placeholder='Street'
                value={street}
                onChange={(event: { target: { value: SetStateAction<string> } }) => {
                  setStreet(event.target.value)
                }}
                className='relative w-full cursor-default rounded bg-black-100 py-2 pl-3 shadow-sm focus:border-gold-50 focus:outline-none focus:ring-1 focus:ring-gold-50'
              />
              {streetHelperText !== '' && (
                <p className='mt-1 ml-3 text-left text-sm italic text-red-500'>
                  {streetHelperText}
                </p>
              )}
            </label>
          </div>

          <div className='col-span-1 col-start-1 row-start-4'>
            <label className='block'>
              <span className='mt-2 mb-2 ml-3 block text-left'>City</span>
              <input
                id='city'
                placeholder='City'
                value={city}
                onChange={(event: { target: { value: SetStateAction<string> } }) => {
                  setCity(event.target.value)
                }}
                className='relative w-full cursor-default rounded bg-black-100 py-2 pl-3 shadow-sm focus:border-gold-50 focus:outline-none focus:ring-1 focus:ring-gold-50'
              />
              {cityHelperText !== '' && (
                <p className='mt-1 ml-3 text-left text-sm italic text-red-500'>{cityHelperText}</p>
              )}
            </label>
          </div>

          <div className='col-span-1 col-start-2 row-start-4'>
            <label className='block'>
              <span className='mt-2 mb-2 ml-3 block text-left'>Country</span>
              <CountrySelector
                id={'countries'}
                ref={myRef}
                open={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
                onChange={(val) => setCountry(val)}
                selectedValue={
                  allCountries.find((option) => option.value === country) as IAllCountries
                }
              />
            </label>
          </div>

          <div className='row-start-11 col-start-2 text-center'>
            <EditUser
              verified={formValidation}
              onClick={handleAddUser}
              btnText='Edit User'
              disabled={editUser.isLoading}
              // submitting={submitting}
              // successSubmit={successSubmit}
            />
            {editUser.error && <p>Something went wrong! {editUser.error.message}</p>}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
