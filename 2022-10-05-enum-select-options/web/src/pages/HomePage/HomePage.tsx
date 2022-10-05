import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags
        title="How to Make SelectFields for Prisma enums in RedwoodJS"
        description="How to Make SelectFields for Prisma enums in RedwoodJS"
      />
      <p>
        <h2 className="py-4 text-xl font-semibold">The Problem</h2>
        <ul className="list-disc">
          <li>Cannot get values from the enum to make a select control</li>
          <li>Web cannot access Prisma client types</li>
          <li>Enum values don't have friendly, readable labels</li>
        </ul>
        <h2 className="py-4 text-xl font-medium">Current Scaffolding</h2>
        <p>
          Scaffolding will render enums in forms with Radio Options or
          Checkboxes.
        </p>
        <ul className="mt-4 list-disc">
          <li>
            But, scaffolding won't pickup new enums .... you would have to
            re-scaffold and force update the web components.
          </li>
          <li>Plus, select fields take up less space in a form.</li>
        </ul>
      </p>

      <h2 className="py-4 text-xl font-medium">Solution and Demo</h2>

      <p>
        Let's look at some Star Wars{' '}
        <Link
          className="text-blue-500 hover:text-blue-700"
          to={routes.characters()}
        >
          characters
        </Link>{' '}
        and{' '}
        <Link
          className="text-blue-500 hover:text-blue-700"
          to={routes.characters()}
        >
          spaceships (TODO)
        </Link>{' '}
        and what episodes they appear in.
      </p>
      <div className="mt-8 space-y-4 space-x-2">
        <a
          className="text-blue-500 hover:text-blue-700"
          href="https://github.com/redwoodjs/redwood-office-hours/blob/main/2022-10-05-enum-select-options/README.md"
        >
          Read more ...
        </a>
        <span>and</span>
        <a
          className="text-blue-500 hover:text-blue-700"
          href="https://github.com/redwoodjs/redwood-office-hours/blob/main/2022-10-05-enum-select-options/README.md"
        >
          Get the Code!
        </a>
      </div>
    </>
  )
}

export default HomePage
