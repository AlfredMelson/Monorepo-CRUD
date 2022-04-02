import { useRecoilValue } from 'recoil'
import { searchFieldStateAtom } from '../recoil-state'
import { IUser } from '../types/User'

export default function SearchFilter(filteredList: IUser[]) {
  const searchFieldState = useRecoilValue(searchFieldStateAtom)

  // check filteredList contains a value
  if (filteredList.length === 0) {
    return
  }

  const searchTermSort = [...filteredList].filter((user) => {
    return user.lastname.toLowerCase().includes(searchFieldState.toLowerCase())
  })

  return searchTermSort
}
