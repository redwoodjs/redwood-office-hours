import SpaceshipCell from 'src/components/Spaceship/SpaceshipCell'

type SpaceshipPageProps = {
  id: number
}

const SpaceshipPage = ({ id }: SpaceshipPageProps) => {
  return <SpaceshipCell id={id} />
}

export default SpaceshipPage
