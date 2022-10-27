import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
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
      <img src="/og" />
      <img src="/og-params/books/123" />
      <div>
        <img src="/og-pokemon?pokemon=charizard" height={160} />
      </div>
      <div>
        <img src="/og-pokemon?pokemon=Bulbasaur" width={640} />
      </div>
      <div>
        <img src="/og-pokemon/p/bulbasaur" width={640} />
      </div>
    </>
  )
}

export default HomePage
