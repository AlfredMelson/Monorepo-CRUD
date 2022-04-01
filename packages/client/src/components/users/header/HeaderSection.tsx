import AddUser from './AddUser'
import LogoAppName from './LogoAppName'
import SearchUsers from './SearchUsers'

export default function HeaderSection() {
  return (
    <div className='flex w-full p-4'>
      <LogoAppName />
      <AddUser />
      <SearchUsers />
    </div>
  )
}

