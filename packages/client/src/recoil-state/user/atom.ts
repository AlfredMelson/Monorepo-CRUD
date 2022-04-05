import { atom } from 'recoil'

/**
 * Recoil managed state representing employees list per pagination
 *
 * @return {Object} a writeable RecoilState object
 * @bug Objects stored in atoms will freeze in development mode when bugs are detected
 *
 * Utilise hooks to manage state changes and notify components subscribing to re-render.
 *
 */
export const selectedUserAtom = atom({
  key: 'selectedUser',
  default: []
})
// const [selectedUser, setSelectedUser] = useRecoilState(selectedUserAtom)
// const setSelectedUser = useSetRecoilState(selectedUserAtom)
// const selectedUser = useRecoilValue(selectedUserAtom)
// const resetSelectedUser = useResetRecoilState(selectedUserAtom)
