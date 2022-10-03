import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type CharacterLayoutProps = {
  children: React.ReactNode
}

const CharactersLayout = ({ children }: CharacterLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.characters()}
            className="rw-link"
          >
            Characters
          </Link>
        </h1>
        <Link
          to={routes.newCharacter()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Character
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default CharactersLayout
