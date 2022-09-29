import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags
        title="How To build a REST directive with RedwoodJS Transformer Directives"
        description="How To build a REST directive with RedwoodJS Transformer Directives"
      />
      <div className="space-y-4">
        <h1 className="text-xl">
          How To build a REST directive with RedwoodJS Transformer Directives
        </h1>
        <p>
          Inspired by{' '}
          <a
            className="text-blue-500 hover:text-blue-700"
            href="https://graphql.wtf/episodes/61-custom-rest-directive-with-graphql-tools"
          >
            Build a REST directive with GraphQL Tools
          </a>
          by{' '}
          <a
            className="text-blue-500 hover:text-blue-700"
            href="https://twitter.com/notrab"
            target="_blank"
          >
            Jaime Barton
          </a>{' '}
          which you can watch here:
        </p>
        <div className="flex justify-items-center">
          <div className="h-60 overflow-hidden rounded-lg bg-white shadow">
            <a
              className="text-blue-500 hover:text-blue-700"
              href="https://www.youtube.com/watch?v=KZf_Hw0JRE0/"
            >
              <img
                src="https://i.ytimg.com/vi/KZf_Hw0JRE0/maxresdefault.jpg"
                className="h-60"
              ></img>
            </a>
          </div>
        </div>
        <p>
          Jaime shows you how to build a custom @rest directive with GraphQL
          Tools to resolve data from a JSON API -- but, we'll use{' '}
          <a
            className="text-blue-500 hover:text-blue-700"
            href="https://redwoodjs.com/docs/directives"
          >
            Redwood Directives
          </a>{' '}
          instead to show how you can still implement this feature but not have
          to go deep into the GraphQL structure.
        </p>
        <p>
          And ... we'll add a way to fetch a single item from a JSON API ... and
          tests!
        </p>
        <h2 className="text-xl">Demo</h2>
        <div className="space-y-4">
          Browse some{' '}
          <Link
            className="text-blue-500 hover:text-blue-700"
            to={routes.posts()}
          >
            Posts
          </Link>{' '}
          and also some{' '}
          <Link
            className="text-blue-500 hover:text-blue-700"
            to={routes.photos()}
          >
            Photos.
          </Link>
          <p>You can also use the navigation above.</p>
        </div>

        <h2 className="text-xl">More Info</h2>
        <p>Learn How To Build a RedwoodJS @rest Directive</p>
        <div className="space-y-4 space-x-2">
          <a
            className="text-blue-500 hover:text-blue-700"
            href="https://github.com/redwoodjs/redwood-office-hours/blob/main/2022-09-28-rest-directive/README.md"
          >
            Read more ...
          </a>
          <span>and</span>
          <a
            className="text-blue-500 hover:text-blue-700"
            href="https://github.com/redwoodjs/redwood-office-hours/blob/main/2022-09-28-rest-directive/README.md"
          >
            Get the Code!
          </a>
        </div>
      </div>
    </>
  )
}

export default HomePage
