import { IUser } from '../../../types/User'

export default function UserAvatar({ firstname, lastname }: IUser) {
  return (
    <div className='col-span-1 ml-4 grid h-10 w-10 grid-cols-1 place-items-center self-center rounded bg-gold-50'>
      <p className='lg font-bold uppercase text-black '>
        {firstname.substring(0, 1)}
        {lastname.substring(0, 1)}
      </p>
    </div>
  )
}

