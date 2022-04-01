import { IUser } from '../types/User'

// regular expression: https://regexr.com/2rhq7
export const regexEmailValidation =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const moreThanThirty = (registered: string) => {
  const registrationDate = new Date(registered).getTime()

  // one month calc = 30 days * 24 hours * 3600 seconds * 1000 milliseconds
  const oneMonth = 30 * 24 * 3600 * 1000

  // date one month ago
  const thirtyDaysAgo = Date.now() - oneMonth

  // return true if registration date is more than 30 days old
  return registrationDate < thirtyDaysAgo
}

export interface IUserFilter {
  all: IUser[]
  invalid: IUser[]
  duplicate: IUser[]
}

const UserFilter = (users: IUser[]): IUserFilter => {
  // check employees contains a value
  // if (users.length) {
  //   return
  // }
  return {
    all: users,
    ...users.reduce(
      (result: { invalid: any; duplicate: any }, user) => {
        const email = user.email
        if (!regexEmailValidation.test(user.email.toLowerCase())) {
          result.invalid.push(user)
        }
        if (users.filter((user) => user.email === email).length > 1) {
          result.duplicate.push(user)
        }

        return result
      },
      {
        invalid: [],
        duplicate: []
      }
    )
  }
}
export default UserFilter
