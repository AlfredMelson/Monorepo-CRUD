import { Outlet } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { SearchUserDialogStateAtom } from '../../recoil-state'
import DialogContainer from './DialogContainer'

export default function AppLayout() {
  const setSearchUserDialogState = useSetRecoilState(SearchUserDialogStateAtom)

  const closeSearch = (event: any) => {
    if (event.keyCode === 27 || event.currentTarget === event.target) {
      setSearchUserDialogState(false)
    }
  }

  window.addEventListener('keydown', (event) => closeSearch(event))

  return (
    <div className='bg-[url("/assets/bg-user-pattern.png")] bg-fixed bg-top'>
      <div className='scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 scrollbar scrollbar-thin flex min-h-screen w-screen flex-col'>
        <div onClick={(event) => closeSearch(event)}>
          <Outlet />
          <DialogContainer />
        </div>
      </div>
    </div>
  )
}
