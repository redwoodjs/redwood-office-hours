import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <MetaTags
        title="OG Images"
        description="OpenGraph Dynamic Image Generation Examples"
      />
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-12 text-2xl">
          <Link to={routes.home()}>
            OpenGraph Dynamic Image Generation Example
          </Link>
          s
        </h1>

        {children}
      </div>
    </>
  )
}

export default MainLayout
