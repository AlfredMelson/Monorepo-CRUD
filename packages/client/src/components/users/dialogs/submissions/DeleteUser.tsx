interface IDeleteUser {
  onClick: any
  btnText: string
  disabled?: boolean
  submitting?: boolean
  successful?: boolean
}

export default function DeleteUser({
  onClick,
  btnText,
  disabled,
  submitting,
  successful
}: IDeleteUser) {
  return (
    <button
      className='rounded bg-transparent py-1 px-4 text-center text-white-50 hover:bg-grey-50 hover:text-black-50'
      disabled={disabled}
      onClick={onClick}>
      {!submitting ? btnText : successful && 'Check Icon'}
      {submitting && 'Submitting'}
      {/* {submitting ? btnText : successful && 'Check Icon'} */}
    </button>
  )
}
