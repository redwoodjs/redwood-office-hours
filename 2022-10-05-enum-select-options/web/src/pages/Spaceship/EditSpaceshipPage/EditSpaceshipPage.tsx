import EditSpaceshipCell from 'src/components/Spaceship/EditSpaceshipCell'

type SpaceshipPageProps = {
  id: number
}

const EditSpaceshipPage = ({ id }: SpaceshipPageProps) => {
  return <EditSpaceshipCell id={id} />
}

export default EditSpaceshipPage
