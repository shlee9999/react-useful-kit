export default function ExampleCard({
  title,
  description,
  buttonText,
  onClick,
}: {
  title: string
  description: string
  buttonText: string
  onClick: () => void
}) {
  return (
    <div className='ruk-card'>
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={onClick} className='ruk-card-button primary'>
        {buttonText}
      </button>
    </div>
  )
}
