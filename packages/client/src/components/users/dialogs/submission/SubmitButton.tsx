interface ISubmitButton {
  onClick: any
  btnText: string
  submitting?: boolean
  successful?: boolean
}

export default function SubmitButton({ onClick, btnText, submitting, successful }: ISubmitButton) {
  return (
    <button
      className='rounded bg-transparent py-1 px-4 text-center text-white-50 hover:bg-grey-50 hover:text-black-50'
      onClick={onClick}>
      {!submitting ? btnText : successful && 'Check Icon'}
      {submitting && 'Submitting'}
    </button>
  )
}
