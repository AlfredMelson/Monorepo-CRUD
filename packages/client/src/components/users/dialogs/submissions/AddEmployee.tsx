import { useState } from 'react'

interface IAddEmployee {
  onClick: any
  btnText: string
  verified: boolean
  submitting?: boolean
  successSubmit?: boolean
}

export default function AddEmployee({
  onClick,
  btnText,
  verified,
  submitting,
  successSubmit
}: IAddEmployee) {
  const [hover, setHover] = useState(false)

  return (
    <div className='relative mt-4'>
      <button
        disabled={!verified || submitting}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
        {!submitting ? btnText : successSubmit && 'Check Icon'}
      </button>
    </div>
  )
}
