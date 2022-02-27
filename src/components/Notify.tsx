interface Props {
  errorMessage: string | null
}

const Notify = ({errorMessage}: Props) => {
  if (!errorMessage) return null

  return (
    <div style={{ color: 'red', position: 'fixed', top: 0, width: '100%' }}>
      {errorMessage}
    </div>
  )
}

export default Notify