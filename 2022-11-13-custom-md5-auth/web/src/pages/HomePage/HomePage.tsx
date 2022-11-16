import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { isAuthenticated } from 'src/lib/auth'

const HomePage = () => {
  const { isAuthenticated, logOut } = useAuth()
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {!isAuthenticated && (
              <span className="block">Ready to dive in?</span>
            )}
            <span className="block">
              Let's{' '}
              <Link to={routes.about()} className="text-indigo-700 underline">
                test
              </Link>{' '}
              Custom Auth today.
            </span>
          </h2>
          <div className="mt-8 flex justify-center">
            {!isAuthenticated && (
              <>
                <div className="inline-flex rounded-md shadow">
                  <Link
                    to={routes.signIn()}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
                  >
                    Sign In
                  </Link>
                </div>
                <div className="ml-3 inline-flex">
                  <Link
                    to={routes.signUp()}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-100 px-5 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}
            {isAuthenticated && (
              <>
                <>
                  <div className="inline-flex rounded-md shadow">
                    <Link
                      to={routes.profile()}
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
                    >
                      View Profile
                    </Link>
                  </div>
                  <div className="ml-3 inline-flex">
                    <button
                      onClick={logOut}
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-100 px-5 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200"
                    >
                      Log Out
                    </button>
                  </div>
                </>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
