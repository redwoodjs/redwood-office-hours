import EditCharacterCell from 'src/components/Character/EditCharacterCell'

type CharacterPageProps = {
  id: number
}

const EditCharacterPage = ({ id }: CharacterPageProps) => {
  return <EditCharacterCell id={id} />
}

export default EditCharacterPage
