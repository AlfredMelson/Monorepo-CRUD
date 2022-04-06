import { SearchInput, SearchSelectors } from '.'

export default function SearchSection() {
  return (
    <div className='grid grid-cols-1 gap-y-2 pt-3 pb-6'>
      <SearchSelectors />
      <SearchInput />
    </div>
  )
}

