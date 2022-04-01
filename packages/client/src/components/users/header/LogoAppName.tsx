import { LogoIcon } from '../../icons'

export default function LogoAppName() {
  return (
    <div className='flex grow text-gold-50'>
      <div className='flex flex-row justify-between align-middle text-gold-50'>
        <LogoIcon />
        <h4 className='ml-2 self-start text-left align-middle text-xl font-semibold'>
          Application Users
        </h4>
      </div>
    </div>
  )
}

