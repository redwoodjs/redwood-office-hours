import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import Footer from 'src/components/Footer'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <h1 className="mb-8 text-2xl">
        <Link to={routes.home()}>
          How to Make SelectFields for Prisma enums in RedwoodJS
        </Link>
      </h1>
      <MetaTags
        title="How to Make SelectFields for Prisma enums in RedwoodJS"
        description="How to Make SelectFields for Prisma enums in RedwoodJS"
        author="David Thyresson"
        ogUrl="https://rw-office-hours-enum-select-list.netlify.app"
        ogContentUrl="https://redwoodjs.com/images/rw-og.png"
      />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
