import { LayoutGroup, motion } from 'framer-motion'
import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { alphabeticalSortAtom, filteredUserStateSelector } from '../../../recoil-state'
import { usersCardFooter } from '../../../style'
import { ISortData } from '../../../types/User'
import { ABCIcon, CBAIcon } from '../../icons'

export default function Collocation() {
  const [alphabeticalSort, setAlphabeticalSort] = useRecoilState(alphabeticalSortAtom)

  const filteredUserState = useRecoilValue(filteredUserStateSelector)

  const [focused, setFocused] = useState<number | null>(null)
  const [selected, setSelected] = useState<number>(1)

  const sortData: ISortData[] = [
    { index: 0, value: 'alphabetical', label: 'Sort alphabetical', icon: <ABCIcon /> },
    { index: 1, value: 'reverse', label: 'Reverse sort', icon: <CBAIcon /> }
  ]

  return (
    <motion.div
      variants={usersCardFooter}
      layout
      className='col-span-1 col-start-1 place-content-center'>
      {filteredUserState && filteredUserState.length >= 2 && (
        <LayoutGroup>
          <div onMouseLeave={() => setFocused(null)} className='grid grid-cols-[_60px_60px] '>
            {sortData.map((option) => (
              <li
                key={option.index}
                onKeyDown={(event: { key: string }) =>
                  event.key === 'Enter' && setSelected(option.index)
                }
                onFocus={() => setFocused(option.index)}
                onMouseEnter={() => setFocused(option.index)}
                onClick={() => {
                  setSelected(option.index)
                  setAlphabeticalSort(option.value)
                }}
                aria-label='Close Search Area'
                className='text-md relative cursor-pointer list-none font-medium'>
                <span
                  className='absolute left-0 right-0 top-0 z-10'
                  style={{ color: selected === option.index ? ' #fff' : '#1f6feb' }}>
                  {option.icon}
                </span>
                {focused === option.index && (
                  <motion.div
                    transition={{
                      layout: {
                        duration: 0.2,
                        ease: 'easeOut'
                      }
                    }}
                    className='absolute -left-3 right-0 top-0 z-0 h-9 w-full rounded bg-grey-700'
                    layoutId='highlight'
                  />
                )}
              </li>
            ))}
          </div>
        </LayoutGroup>
      )}
    </motion.div>
  )
}

// <LayoutGroup>
//   <div className='justify-center rounded-lg text-lg' role='group' aria-label='user sorting'>
//     {sortData.map((sort) => (
//       <button
//         onKeyDown={(event: { key: string }) =>
//           event.key === 'Enter' && setSelected(sort.index)
//         }
//         onFocus={() => setFocused(sort.index)}
//         onMouseEnter={() => setFocused(sort.index)}
//         onClick={() => {
// setAlphabeticalSort(
//   alphabeticalSort === 'alphabetical' ? 'reverse' : 'alphabetical'
// )
//           setSelected(sort.index)
//         }}
//         key={sort.index}
//         value={sort.value}
//         color='green'
//         type='button'
//         className='relative px-2 first:mr-3 last:ml-3'>
//         {focused === sort.index && (
//           <motion.div
//             transition={{
//               layout: {
//                 duration: 0.2,
//                 ease: 'easeOut'
//               }
//             }}
//             className='absolute bottom-1 z-0 h-8 w-full rounded bg-grey-600'
//             layoutId='highlight'
//           />
//         )}
//         <span className='z-10 text-white-50 transition duration-300  ease-in-out hover:text-blue-400'>
//           {alphabeticalSort === sort.value ? sort.icon : sort.icon}
//         </span>
//       </button>
//     ))}
//   </div>
// </LayoutGroup>
