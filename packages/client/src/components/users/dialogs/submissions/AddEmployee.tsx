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
  const [loginHover, setLoginHover] = useState(false)

  return (
    <div>
      <div
        style={{
          position: 'relative',
          margin: '20px 0 0',
          padding: 0
        }}>
        <button
          disabled={!verified || submitting}
          onClick={onClick}
          onMouseEnter={() => setLoginHover(true)}
          onMouseLeave={() => setLoginHover(false)}>
          {!submitting ? btnText : successSubmit && 'Check Icon'}
        </button>
      </div>
    </div>
  )
}
