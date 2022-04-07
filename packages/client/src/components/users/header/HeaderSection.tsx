import AddUser from './AddUser'
import LogoAppName from './LogoAppName'
import SearchUsers from './SearchUsers'

export default function HeaderSection() {
  return (
    <div className='flex w-full px-4 pt-6 pb-2'>
      <LogoAppName />
      <AddUser />
      <SearchUsers />
    </div>
  )
}
