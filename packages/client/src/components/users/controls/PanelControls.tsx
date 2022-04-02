import Collocation from './Collocation'
import Pagination from './Pagination'

export default function PanelControls() {
  return (
    <div className='mb-0 grid w-full grid-cols-2 px-6 pt-3 pb-0'>
      <Collocation />
      <Pagination />
    </div>
  )
}
