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
          How to Build an AutoComplete widget with RedwoodJS GraphQL API and
          Algolia UI Libraries
        </Link>
      </h1>
      <MetaTags
        title=" How to Build an AutoComplete widget with RedwoodJS GraphQL API and Algolia UI Libraries"
        description=" How to Build an AutoComplete widget with RedwoodJS GraphQL API and Algolia UI Libraries"
        author="David Thyresson"
        ogUrl="https://rw-office-hours-algolia-autocomplete.netlify.app"
        ogContentUrl="https://redwoodjs.com/images/rw-og.png"
      />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
