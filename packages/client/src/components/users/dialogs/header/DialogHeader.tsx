interface IDialogHeader {
  title: string
}

export default function DialogHeader({ title }: IDialogHeader) {
  return (
    <div className='m-0 p-0'>
      <h6 className='ml-2 text-2xl text-gold-50'>{title}</h6>
    </div>
  )
}
