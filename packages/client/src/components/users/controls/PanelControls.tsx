import Collocation from './Collocation'
import Pagination from './Pagination'

export default function PanelControls() {
  return (
    <div className='grid h-12 w-full grid-cols-[_240px_auto] justify-items-center pt-2'>
      <Collocation />
      <Pagination />
    </div>
  )
}
