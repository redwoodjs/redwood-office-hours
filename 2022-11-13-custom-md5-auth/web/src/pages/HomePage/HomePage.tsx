import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { isAuthenticated } from 'src/lib/auth'

const HomePage = () => {
  const { isAuthenticated, logOut } = useAuth()
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>
      {!isAuthenticated && (
        <>
          <Link to={routes.signIn()}>Sign In</Link>
          <Link to={routes.signUp()}>Sign Up</Link>
        </>
      )}
      {isAuthenticated && (
        <>
          <Link to={routes.secure()}>View Secure Page</Link>
          <button onClick={logOut}>Log Out</button>
        </>
      )}
    </>
  )
}

export default HomePage
