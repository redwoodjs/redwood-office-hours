import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type SpaceshipLayoutProps = {
  children: React.ReactNode
}

const SpaceshipsLayout = ({ children }: SpaceshipLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.spaceships()}
            className="rw-link"
          >
            Spaceships
          </Link>
        </h1>
        <Link
          to={routes.newSpaceship()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Spaceship
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default SpaceshipsLayout
