import { IUser } from '../types/User'

interface ISearchFilter {
  allUsers: IUser[]
  searchTerm: string
  searchPreference?: number
}

export default function SearchFilter(searchParams: ISearchFilter) {
  const { allUsers, searchTerm, searchPreference } = searchParams

  const searchTermSort = [...allUsers].filter((user) => {
    switch (searchPreference) {
      case 1:
        return user.firstname.toLowerCase().includes(searchTerm?.toLowerCase())
      case 2:
        return user.lastname.toLowerCase().includes(searchTerm.toLowerCase())
      case 3:
        return user.city.toLowerCase().includes(searchTerm.toLowerCase())
      case 4:
        return user.country.toLowerCase().includes(searchTerm.toLowerCase())
    }
  })

  return searchTermSort
}
