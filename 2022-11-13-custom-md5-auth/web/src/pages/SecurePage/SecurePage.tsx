import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const SecurePage = () => {
  return (
    <>
      <MetaTags title="Secure" description="Secure page" />

      <h1>SecurePage</h1>
      <p>
        Find me in <code>./web/src/pages/SecurePage/SecurePage.tsx</code>
      </p>
      <p>
        My default route is named <code>secure</code>, link to me with `
        <Link to={routes.secure()}>Secure</Link>`
      </p>
    </>
  )
}

export default SecurePage
