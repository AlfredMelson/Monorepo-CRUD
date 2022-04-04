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
    <LayoutGroup>
      <div
        onMouseLeave={() => setFocused(null)}
        className='mb-2 grid grid-cols-[_110px_110px_110px_110px] place-content-center gap-4'>
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
            aria-label='Close Search Area'
            className='text-md relative cursor-pointer list-none py-2 font-medium'>
            <span
              className='absolute left-1 right-0 -top-3 z-10'
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
                className='absolute -bottom-1 left-1 right-1 z-0 h-10 w-full rounded bg-grey-600'
                layoutId='highlight'
              />
            )}
          </li>
        ))}
      </div>
    </LayoutGroup>
  )
}

