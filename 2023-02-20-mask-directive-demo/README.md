# Masked Email Demo

Showcase the RedwoodJS Transformer directive to mask an email address -- with tests to confirm the masking behaving properly.

## Basic Setup

1. `yarn install`
1. `yarn rw prisma migrate dev` / or `yarn rw prisma migrate reset` to clear an re-seed. Seeds use Snaplet copycat.

Note this repo already has the model and the service resolvers generated.

1. Add model in api/db/schema.prisma

```
model Profile {
  id       Int      @id @default(autoincrement())
  email    String   @unique
  name     String
  birthday DateTime
}
```

1. Create the SDL, and CRUD service aka resolvers:
1. `yarn rw g sdl Profile --crud`

Continued ...

1. `yarn rw prisma studio` see Profile data
1. `yarn rw dev` launch dev server app
1. open `http://localhost:8911/graphql` for playground
1. Query

```
{
  "data": {
    "profiles": [
      {
        "birthday": "2001-02-26T13:13:05.000Z",
        "email": "Rosamond_Sawayn64428@obtrudeintent.com",
        "id": 1,
        "name": "Genesis Connelly"
      },
      {
        "birthday": "2003-08-16T07:46:52.000Z",
        "email": "Jared.Toy32761@oversell-dignity.net",
        "id": 2,
        "name": "Henderson Rice"
      },
      {
        "birthday": "2003-08-24T07:59:29.000Z",
        "email": "Linwood.Bechtelar19701@spectacularleek.biz",
        "id": 3,
        "name": "Buster Bergnaum"
      },
      {
        "birthday": "1980-01-05T00:03:20.000Z",
        "email": "Milan.Wiza88466@swayfat.name",
        "id": 4,
        "name": "Augustus Yundt"
      },
      {
        "birthday": "2002-11-15T22:26:05.000Z",
        "email": "Carmel.Mohr27118@astonishingmorbidity.com",
        "id": 5,
        "name": "Lorna Brekke"
      },
```

1. `yarn rw g directive maskedEmail` and pick Transformer or `yarn rw g directive maskedEmail --type transformer`
1. Implement directive and test. See code in `2023-02-20-mask-directive-demo/api/src/directives`.
1. `yarn rw test api` to test transform
1. Add directive to type

```ts
  type Profile {
    id: Int!
    email: String! @maskedEmail
    name: String!
    birthday: DateTime!
  }
```

1. Query again with maskedEmail

```ts
{
  "data": {
    "profiles": [
      {
        "birthday": "2001-02-26T13:13:05.000Z",
        "email": "R*******************@*************.com",
        "id": 1,
        "name": "Genesis Connelly"
      },
      {
        "birthday": "2003-08-16T07:46:52.000Z",
        "email": "J*************@****************.net",
        "id": 2,
        "name": "Henderson Rice"
      },
      {
        "birthday": "2003-08-24T07:59:29.000Z",
        "email": "L*********************@***************.biz",
        "id": 3,
        "name": "Buster Bergnaum"
      },
      {
        "birthday": "1980-01-05T00:03:20.000Z",
        "email": "M**************@*******.name",
        "id": 4,
        "name": "Augustus Yundt"
      },
      {
        "birthday": "2002-11-15T22:26:05.000Z",
        "email": "C***************@********************.com",
        "id": 5,
        "name": "Lorna Brekke"
      },
```

1. See also `yearOnly` directive to transform birthdays

## Advanced

1. Directives can look at arguments, so could pass in the mask charatcter to use `+` instead of `*`
2. Directives can access currentUser auth to mask if not in a role or some other scenario
3. You can cascade transformer directives; see: https://redwoodjs.com/docs/directives#cascade-transformers
4. So can uppercase the masked email by:

```
  type Profile {
    id: Int!
    email: String! @maskedEmail @uppercase
    name: String!
    birthday: DateTime! @yearOnly
  }
 ``

## Notes

1. Implemented as Yoga Plugin to the Redwood GraphQL Server (based on Yoga). See: https://github.com/redwoodjs/redwood/blob/main/packages/graphql-server/src/plugins/useRedwoodDirective.ts
1. Testing within normal api test suite is unique
1. Useful debug logging

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

````

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

````

model Post {
id Int @id @default(autoincrement())
title String
body String
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
```
