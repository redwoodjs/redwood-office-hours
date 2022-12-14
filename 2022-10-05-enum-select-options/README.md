# How to Make SelectFields for Prisma enums in RedwoodJS

👉 Demo: [https://rw-office-hours-enum-select-list.netlify.app](https://rw-office-hours-enum-select-list.netlify.app)

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

## Code

Let's make a way to return enum values and labels in a friendly way!

### Prisma Schema

```prisma
enum Episode {
  NEW_HOPE
  EMPIRE_STRIKES_BACK
  RETURN_OF_THE_JEDI
  ROGUE_ONE
}

model Character {
  id        Int       @id @default(autoincrement())
  name      String    @unique
  appearsIn Episode[]
}
```

### GraphQL Schema

Need Postgres for enums ....

```javascript
// 2022-10-05-enum-select-options/api/src/graphql/options.sdl.ts

export const schema = gql`
  interface OptionItem {
    label: String!
  }

  type EpisodeOption implements OptionItem {
    value: Episode!
    label: String!
  }

  type Query {
    episodeOptions: [EpisodeOption!]! @skipAuth
  }
`
```

### Services

```javascript
// 2022-10-05-enum-select-options/api/src/services/episodeOptions/episodeOptions.ts

import { Episode } from '@prisma/client'
import type { QueryResolvers, EpisodeOption } from 'types/graphql'

import { label } from 'src/lib/helpers'

const getEnumValues = (enumType: Record<string, string>) => {
  return Object.values(enumType).map((value) => {
    return {
      value,
      label: label(value),
    }
  })
}

export const episodeOptions: QueryResolvers['episodeOptions'] = () => {
  return getEnumValues(Episode) as EpisodeOption[]
}

```

---

# README

Welcome to [RedwoodJS](https://redwoodjs.com)!

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```
yarn install
```

Then change into that directory and start the development server:

```
cd my-redwood-project
yarn redwood dev
```

Your browser should automatically open to http://localhost:8910 where you'll see the Welcome Page, which links out to a ton of great resources.

> **The Redwood CLI**
>
> Congratulations on running your first Redwood CLI command!
> From dev to deploy, the CLI is with you the whole way.
> And there's quite a few commands at your disposal:
>
> ```
> yarn redwood --help
> ```
>
> For all the details, see the [CLI reference](https://redwoodjs.com/docs/cli-commands).

## Prisma and the database

Redwood wouldn't be a full-stack framework without a database. It all starts with the schema. Open the [`schema.prisma`](api/db/schema.prisma) file in `api/db` and replace the `UserExample` model with the following `Post` model:

```
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())
}
```

Redwood uses [Prisma](https://www.prisma.io/), a next-gen Node.js and TypeScript ORM, to talk to the database. Prisma's schema offers a declarative way of defining your app's data models. And Prisma [Migrate](https://www.prisma.io/migrate) uses that schema to make database migrations hassle-free:

```
yarn rw prisma migrate dev

# ...

? Enter a name for the new migration: › create posts
```

> `rw` is short for `redwood`

You'll be prompted for the name of your migration. `create posts` will do.

Now let's generate everything we need to perform all the CRUD (Create, Retrieve, Update, Delete) actions on our `Post` model:

```
yarn redwood g scaffold post
```

Navigate to http://localhost:8910/posts/new, fill in the title and body, and click "Save":

Did we just create a post in the database? Yup! With `yarn rw g scaffold <model>`, Redwood created all the pages, components, and services necessary to perform all CRUD actions on our posts table.

## Frontend first with Storybook

Don't know what your data models look like?
That's more than ok—Redwood integrates Storybook so that you can work on design without worrying about data.
Mockup, build, and verify your React components, even in complete isolation from the backend:

```
yarn rw storybook
```

Before you start, see if the CLI's `setup ui` command has your favorite styling library:

```
yarn rw setup ui --help
```

## Testing with Jest

It'd be hard to scale from side project to startup without a few tests.
Redwood fully integrates Jest with the front and the backends and makes it easy to keep your whole app covered by generating test files with all your components and services:

```
yarn rw test
```

To make the integration even more seamless, Redwood augments Jest with database [scenarios](https://redwoodjs.com/docs/testing.md#scenarios) and [GraphQL mocking](https://redwoodjs.com/docs/testing.md#mocking-graphql-calls).

## Ship it

Redwood is designed for both serverless deploy targets like Netlify and Vercel and serverful deploy targets like Render and AWS:

```
yarn rw setup deploy --help
```

Don't go live without auth!
Lock down your front and backends with Redwood's built-in, database-backed authentication system ([dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup)), or integrate with nearly a dozen third party auth providers:

```
yarn rw setup auth --help
```

## Next Steps

The best way to learn Redwood is by going through the comprehensive [tutorial](https://redwoodjs.com/docs/tutorial/foreword) and joining the community (via the [Discourse forum](https://community.redwoodjs.com) or the [Discord server](https://discord.gg/redwoodjs)).

## Quick Links

- Stay updated: read [Forum announcements](https://community.redwoodjs.com/c/announcements/5), follow us on [Twitter](https://twitter.com/redwoodjs), and subscribe to the [newsletter](https://redwoodjs.com/newsletter)
- [Learn how to contribute](https://redwoodjs.com/docs/contributing)
