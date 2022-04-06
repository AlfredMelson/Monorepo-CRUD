import { LayoutGroup, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { searchPreferenceStateAtom } from '../../../recoil-state'

export const searchOptions = [
  { index: 1, label: 'First name' },
  { index: 2, label: 'Last name' },
  { index: 3, label: 'City' },
  { index: 4, label: 'Country' }
]

export default function SearchSelectors() {
  const setSearchPreferenceState = useSetRecoilState(searchPreferenceStateAtom)

  const [focused, setFocused] = useState<number | null>(null)
  const [selected, setSelected] = useState<number>(1)

  useEffect(() => {
    setSearchPreferenceState(selected)
  }, [selected, setSearchPreferenceState])

  return (
    <div className='row-start-1'>
      <div className='grid h-10 grid-cols-[_120px_auto] content-center justify-items-center pt-1'>
        <div className='col-span-1 col-start-1 row-start-1 content-center'>
          <h6 className='text-md text-left font-medium text-gold-50'>User Filter:</h6>
        </div>
        <div className='col-span-1 col-start-2 row-start-1'>
          <LayoutGroup>
            <div
              onMouseLeave={() => setFocused(null)}
              className='grid grid-cols-[_100px_100px_100px_100px] '>
              {searchOptions.map((option) => (
                <li
                  key={option.index}
                  onKeyDown={(event: { key: string }) =>
                    event.key === 'Enter' && setSelected(option.index)
                  }
                  onFocus={() => setFocused(option.index)}
                  onMouseEnter={() => setFocused(option.index)}
                  onClick={() => {
                    setSelected(option.index)
                  }}
                  aria-label='Select search filter'
                  className='text-md text relative cursor-pointer list-none py-4 font-semibold'>
                  <span
                    className='absolute left-0 right-0 top-0 z-10 '
                    style={{ color: selected === option.index ? ' #fff' : '#1f6feb' }}>
                    {option.label}
                  </span>
                  {focused === option.index && (
                    <motion.div
                      transition={{
                        layout: {
                          duration: 0.2,
                          ease: 'easeOut'
                        }
                      }}
                      className='absolute bottom-0 z-0 h-10 w-full rounded bg-grey-600'
                      layoutId='highlight'
                    />
                  )}
                </li>
              ))}
            </div>
          </LayoutGroup>
        </div>
      </div>
    </div>
  )
}

