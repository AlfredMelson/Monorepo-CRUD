import { atom, selector } from 'recoil'
import { IUser } from '../../types/User'
import { SortFilteredList } from '../../utils'
import UserFilter from '../../utils/UserFilter'

/**
 * @return {Object} a writeable RecoilState object
 * @bug Objects stored in atoms will freeze in development mode when bugs are detected
 *
 * Utilise hooks to manage state changes and notify components subscribing to re-render.
 *
 */

export const userStateAtom = atom<IUser[]>({
  key: 'userState',
  default: []
})
// const [userState, setUserState] = useRecoilState(userStateAtom)
// const setUserState = useSetRecoilState(userStateAtom)
// const userState = useRecoilValue(userStateAtom)
// const resetUserState = useResetRecoilState(userStateAtom)

export const paginatedUserListAtom = atom<IUser[]>({
  key: 'paginatedUserList',
  default: []
})
// const [paginatedUserList, setPaginatedUserList] = useRecoilState(paginatedUserListAtom)
// const setPaginatedUserList = useSetRecoilState(paginatedUserListAtom)
// const paginatedUserList = useRecoilValue(paginatedUserListAtom)
// const resetPaginatedUserList = useResetRecoilState(paginatedUserListAtom)

export const alphabeticalSortAtom = atom<'alphabetical' | 'reverse'>({
  key: 'alphabeticalSort',
  default: 'alphabetical'
})
// const [alphabeticalSort, setAlphabeticalSort] = useRecoilState(alphabeticalSortAtom)
// const setAlphabeticalSort = useSetRecoilState(alphabeticalSortAtom)
// const alphabeticalSort = useRecoilValue(alphabeticalSortAtom)
// const resetAlphabeticalSort = useResetRecoilState(alphabeticalSortAtom)

export const userFilterStateAtom = atom<string>({
  key: 'userFilterState',
  default: 'all'
})
// const [userFilterState, setUserFilterState] = useRecoilState(userFilterStateAtom)
// const setUserFilterState = useSetRecoilState(userFilterStateAtom)
// const userFilterState = useRecoilValue(userFilterStateAtom)
// const resetUserFilterState= useResetRecoilState(userFilterStateAtom)

export const searchFieldStateAtom = atom<string>({
  key: 'searchFieldState',
  default: ''
})
// const [searchFieldState, setSearchFieldState] = useRecoilState(searchFieldStateAtom)
// const setSearchFieldState = useSetRecoilState(searchFieldStateAtom)
// const searchFieldState = useRecoilValue(searchFieldStateAtom)
// const resetSearchFieldState = useResetRecoilState(searchFieldStateAtom)

export const filteredUserStateSelector = selector({
  key: 'filteredUserState',
  get: async ({ get }) => {
    const allUsers = await get(userStateAtom)
    const sort: 'alphabetical' | 'reverse' = get(alphabeticalSortAtom)
    const filter = get(userFilterStateAtom)
    const filteredUsers = UserFilter(allUsers)

    if (sort === 'alphabetical') {
      return SortFilteredList(filteredUsers.all)
    }

    if (sort === 'reverse') {
      const sorted = SortFilteredList(filteredUsers.all)
      return sorted?.reverse()
    }
  }
})
