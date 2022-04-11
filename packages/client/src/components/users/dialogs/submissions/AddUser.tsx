interface IAddEmployee {
  onClick: any
  btnText: string
  disabled?: boolean
  submitting?: boolean
  successful?: boolean
}

export default function AddEmployee({
  onClick,
  btnText,
  disabled,
  submitting,
  successful
}: IAddEmployee) {
  return (
    <div className='relative mt-4'>
      <button
        className='rounded bg-white py-2 px-4 text-center text-black hover:bg-gray-200'
        disabled={disabled}
        onClick={onClick}>
        {!submitting ? btnText : successful && 'Check Icon'}
        {submitting && 'Submitting'}
      </button>
    </div>
  )
}
