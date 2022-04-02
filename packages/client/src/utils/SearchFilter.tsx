import { IUser } from '../types/User'

export default function SearchFilter(filteredList: IUser[], searchTerm: string) {
  // check filteredList contains a value
  // if (filteredList.length === 0) {
  //   return
  // }

  const searchTermSort = [...filteredList].filter((user) => {
    return user.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return searchTermSort
}
