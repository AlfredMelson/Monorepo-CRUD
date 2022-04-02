import { IUser } from '../types/User'

export default function SearchFilter(
  filteredList: IUser[],
  searchTerm: string,
  searchPreference: number
) {
  const searchTermSort = [...filteredList].filter((user) => {
    // return user.lastname.toLowerCase().includes(searchTerm.toLowerCase())

    switch (searchPreference) {
      case 1:
        return user.firstname.toLowerCase().includes(searchTerm.toLowerCase())
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
