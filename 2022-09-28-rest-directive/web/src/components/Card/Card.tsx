type CardProps = {
  children?: React.ReactNode
}
const Card = ({ children }: CardProps) => {
  return (
    <div className="rounded-md border-2 border-gray-200 p-4 shadow-sm">
      {children}
    </div>
  )
}

export default Card
