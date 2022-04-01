import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { filteredUserStateSelector, paginatedUserListAtom } from '../../../recoil-state'
import { Paginate } from '../../../utils'
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons'

export default function Pagination() {
  const [page, setPage] = useState<number>(1)
  const [numPages, setNumPages] = useState<number>(1)

  const filteredUserState = useRecoilValue(filteredUserStateSelector)

  const setPaginatedUserList = useSetRecoilState(paginatedUserListAtom)

  useEffect(() => {
    // check filteredUserState contains a value
    if (filteredUserState === undefined || null) {
      return
    }
    const count = filteredUserState.length

    const pageObj = {
      totalUsers: count,
      selectedPage: page
    }

    const paginateRes = Paginate(pageObj)

    const userIDs = filteredUserState?.slice(
      paginateRes.beginningIndex,
      paginateRes.endingIndex + 1
    )
    setPaginatedUserList(userIDs)

    setNumPages(paginateRes.totalPages)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filteredUserState])

  return (
    <>
      {numPages > 1 && (
        <div className='flex items-center justify-between pt-2'>
          <div className='flex flex-1 justify-between sm:hidden'>
            <a
              href='#'
              className=' inline-flex items-center px-4 text-sm font-medium text-blue-500 transition duration-300 ease-in-out hover:text-blue-400  focus:text-blue-400 focus:outline-none active:text-blue-400 '>
              Previous
            </a>
            <a
              href='#'
              className=' ml-3 inline-flex items-center px-4 text-sm font-medium text-blue-500 transition duration-300 ease-in-out hover:text-blue-400  focus:text-blue-400 focus:outline-none active:text-blue-400'>
              Next
            </a>
          </div>
          <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-around'>
            <div>
              <nav className='z-0 inline-flex -space-x-px shadow-sm' aria-label='Pagination'>
                {page !== 1 ? (
                  <button
                    onClick={() => setPage(page - 1)}
                    className=' inline-flex items-center rounded-l-md px-2 text-sm font-medium text-blue-500 transition duration-300 ease-in-out hover:text-blue-400  focus:text-blue-400 focus:outline-none active:text-blue-400 '>
                    <span className='sr-only'>Previous</span>
                    <ChevronLeftIcon
                      className='h-5 w-5 text-blue-500 transition duration-300 ease-in-out hover:text-blue-400 focus:text-blue-400 focus:outline-none active:text-blue-400'
                      aria-hidden='true'
                    />
                  </button>
                ) : (
                  <button className=' inline-flex items-center rounded-l-md px-2 text-sm font-medium text-grey-800'>
                    <span className='sr-only'>Previous</span>
                    <ChevronLeftIcon className='h-5 w-5 text-grey-800' aria-hidden='true' />
                  </button>
                )}

                {numPages < 3 &&
                  Array.from(Array(numPages), (x, i) => i + 1).map((pageNum) => (
                    <a
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      href='#'
                      aria-current='page'
                      className='-indigo-500  z-10 inline-flex items-center px-4 text-sm font-medium text-blue-500 transition duration-300 ease-in-out hover:text-blue-400 focus:text-blue-400 focus:outline-none active:text-blue-400'>
                      {page === pageNum ? (
                        <span className='text-white-50'> {pageNum} </span>
                      ) : (
                        pageNum
                      )}
                    </a>
                  ))}

                {page !== numPages ? (
                  <button
                    onClick={() => setPage(page + 1)}
                    className=' inline-flex items-center rounded-r-md px-2 text-sm font-medium text-blue-500 transition duration-300 ease-in-out hover:text-blue-400  focus:text-blue-400 focus:outline-none active:text-blue-400 '>
                    <span className='sr-only'>Next</span>
                    <ChevronRightIcon
                      className='h-5 w-5 text-blue-500 transition duration-300 ease-in-out hover:text-blue-400 focus:text-blue-400 focus:outline-none active:text-blue-400'
                      aria-hidden='true'
                    />
                  </button>
                ) : (
                  <button className=' inline-flex items-center rounded-l-md px-2 text-sm font-medium text-grey-800'>
                    <span className='sr-only'>Previous</span>
                    <ChevronRightIcon className='h-5 w-5 text-grey-800' aria-hidden='true' />
                  </button>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
