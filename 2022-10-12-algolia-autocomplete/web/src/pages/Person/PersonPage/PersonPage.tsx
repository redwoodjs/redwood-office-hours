import PersonCell from 'src/components/Person/PersonCell'

type PersonPageProps = {
  id: number
}

const PersonPage = ({ id }: PersonPageProps) => {
  return <PersonCell id={id} />
}

export default PersonPage
