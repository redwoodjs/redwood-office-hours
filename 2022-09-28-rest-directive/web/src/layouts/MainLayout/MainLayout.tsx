import { HomeIcon } from '@heroicons/react/20/solid'

import { NavLink, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import Footer from 'src/components/Footer/Footer'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const pages = [
    { name: 'Posts', to: routes.posts(), current: true },
    { name: 'Photos', to: routes.photos(), current: true },
  ]

  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 2200 }} />

      <nav
        className="flex border-b border-gray-200 bg-white"
        aria-label="Breadcrumb"
      >
        <ol className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
          <li className="flex">
            <div className="flex items-center">
              <NavLink
                className="text-gray-400 hover:text-gray-500"
                activeClassName="text-gray-500 hover:text-gray-700"
                to={routes.home()}
              >
                <HomeIcon
                  className="h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="sr-only">Home</span>
              </NavLink>
            </div>
          </li>
          {pages.map((page) => (
            <li key={page.name} className="flex">
              <div className="flex items-center">
                <svg
                  className="h-full w-6 flex-shrink-0 text-gray-200"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <NavLink
                  to={page.to}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  activeClassName="text-gray-700 hover:text-gray-900"
                  aria-current={page.current ? 'page' : undefined}
                >
                  {page.name}
                </NavLink>
              </div>
            </li>
          ))}
        </ol>
      </nav>
      <div className="mx-auto my-12 max-w-7xl sm:px-6 lg:px-8">{children}</div>
      <Footer />
    </>
  )
}

export default MainLayout
