import { motion } from 'framer-motion'
import { useRecoilState, useRecoilValue } from 'recoil'
import { alphabeticalSortAtom, filteredUserStateSelector } from '../../../recoil-state'
import { usersCardFooter } from '../../../style'
import { ISortData } from '../../../types/User'
import { ABCIcon, CBAIcon } from '../../icons'

export default function Collocation() {
  const [alphabeticalSort, setAlphabeticalSort] = useRecoilState(alphabeticalSortAtom)

  const filteredUserState = useRecoilValue(filteredUserStateSelector)

  const sortData: ISortData[] = [
    { index: 0, value: 'alphabetical', label: 'Sort alphabetical', icon: <ABCIcon /> },
    { index: 1, value: 'reverse', label: 'Reverse sort', icon: <CBAIcon /> }
  ]

  return (
    <motion.div variants={usersCardFooter} layout className='col-span-1 col-start-1'>
      {filteredUserState && filteredUserState.length >= 2 && (
        <div className='justify-center rounded-lg text-lg' role='group' aria-label='user sorting'>
          {sortData.map((sort) => (
            <button
              onClick={() =>
                setAlphabeticalSort(
                  alphabeticalSort === 'alphabetical' ? 'reverse' : 'alphabetical'
                )
              }
              key={sort.index}
              value={sort.value}
              color='green'
              type='button'
              className='first:mr-3 last:ml-3'>
              {alphabeticalSort === sort.value ? (
                <span className='text-white-50 transition duration-300 ease-in-out'>
                  {sort.icon}
                </span>
              ) : (
                <span className='text-blue-500 transition duration-300 ease-in-out hover:text-blue-400'>
                  {sort.icon}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}
