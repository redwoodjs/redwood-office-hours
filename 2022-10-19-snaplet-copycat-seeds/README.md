# 🌱 Seeding Deterministic Fake Data with Snaplet's Copycat and RedwoodJS

To paraphrase [Snaplet](https://docs.snaplet.dev/references/data-operations/generate):

> Imagine you've created a new project with a brand new database, you've designed the schema, and now you need some data to test against. You want to generate fake data for your database. You can write tests against the new data, and also experience your UX and UI with the new data.

Perhaps, you want 10, 100, 1,000 or more records to showcase the particular UI or test.

There are ways of generating random fake data, but it helps to have **deterministic fake data**. Why?

1. You start to recognize and get a feel for your app with the data you see. Is the first user always names Peter? Well, why is it now Tom?
2. If you do aggregation or filters, on country, do I usually get 10 records from Sweden?
3. I can write tests that the record I expect to be returned will always be the same.

In [short](https://www.snaplet.dev/post/mapped-data-values-with-copycat):

> It is better to have deterministic data because it means things are predictable. In other words, when you use it for tests, it means that your test is always getting the same input. This predictability helps you to set expectations or make assertions on what the outputs are going to be, and this is similar for working with data in development, aside from tests.

We can use [Snaplet's](https://www.snaplet.dev) [copycat](https://github.com/snaplet/copycat) utility to generate this recognizable and dependable datasets.

With copycat, if you ask for a fake email address with a certain key, you'll always get that same email, address for that key.

For an introduction to copycat, please read [Mapped data values with Copycat](https://www.snaplet.dev/post/mapped-data-values-with-copycat).

Also, it might be easy to think up 4-5 emails for seeds like:

```js
const data: Prisma.UserCreateArgs['data'][] = [
  { name: 'alice', email: 'alice@example.com' },
  { name: 'mark', email: 'mark@example.com' },
  { name: 'jackie', email: 'jackie@example.com' },
  { name: 'bob', email: 'bob@example.com' },
]
```

but do you want to think up 20, or 100 or 1000 emails that seem reasonable?

## RedwoodJS and Prisma Seeding

Redwood [uses Prisma's `db seed` CLI command](https://redwoodjs.com/docs/cli-commands#prisma-db-seed) to seed your application's database.

```terminal
yarn redwood prisma db seed
```

This command seeds your database by running your project's `seed.js|ts` file which you can find in your scripts directory.

### When Seeds run

You can run the `seed` command manually -- but Prisma will also often run the seed command if it has `reset` the database of such schema changes quire a reset.

Prisma Migrate resets the database and triggers seeding in the following scenarios:

- You manually run the prisma migrate reset CLI command.
- The database is reset interactively in the context of using prisma migrate dev - for example, as a result of migration history conflicts or database schema drift.
- When you want to use prisma migrate dev or prisma migrate reset without seeding, you can pass the --skip-seed flag.

Redwood defines the `seed` script to run in the project root's `package.json` config:

```js
// package.json
{
  "private": true,
  "workspaces": {
    "packages": [
      "api",
      "web",
      "packages/*"
    ]
  },
  "devDependencies": {
    "@redwoodjs/core": "3.2.0"
  },
  "eslintConfig": {
    "extends": "@redwoodjs/eslint-config",
    "root": true
  },
  "engines": {
    "node": ">=14.19 <=16.x",
    "yarn": ">=1.15"
  },
  "prisma": {
    "seed": "yarn rw exec seed" // 👈 Prisma runs this "seed" command when it needs to seed the database.
  },
  "packageManager": "yarn@3.2.3"
}
```

This script can be any script (even a bash script), but by default it uses [Redwood's `exec`](https://redwoodjs.com/docs/cli-commands#exec) CLI command to run the `<project-root>/scripts/seed.ts` script.

For more information on Prisma seeding, see Prisma's guide [Seeding your database with TypeScript or JavaScript](https://www.prisma.io/docs/guides/database/seed-database#example-seed-scripts) and also Snaplet's guide on [Prisma Seed](https://docs.snaplet.dev/tutorials/prisma-seed/).

## The Seed Script

Seed data should be small and purposeful, so that it is quick to run on migrations and database resets.

For larger datasets, use a separate script to seed the database suing a CSV file and Postgres's COPY command

## Our Schema

We'll be using Postgres so that we can seed various datatypes, such as arrays that SQLite cannot.

This will also let us use [`createMany`](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany) to bulk add and skip duplicate data to speed up seeding when the data doesn't require relations (such as Users).

When relationships are needed, we'll use [Prisma's nested writes](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-writes) to "connect" a Profile to a User as well as Posts to Profiles.

## Generating Deterministic Data

We'll use several Snaplet copycat's features to generate seed data.

```
yarn workspace api add @snaplet/copycat
```

First, we create a `shape` that matches the model's required fields:

```js
const profile = shape({
  firstName: copycat.firstName,
  lastName: copycat.lastName,
  bio: copycat.paragraph.options({ min: 2, max: 3 }),
  dateOfBirth: copycat.dateString.options({ minYear: 1970, maxYear: 2000 }),
  phoneNumber: copycat.phoneNumber,
  postalAddress: copycat.postalAddress,
  membershipLevel: copycat.oneOf(['free', 'monthly', 'annual']),
  numberOfPostsRead: copycat.int.options({ min: 0, max: 20 }),
  timezone: copycat.timezone,
})
```

Here we use copycat to generate names, several paragraphs of text for a biography, a date of birth that ensures they are 22 years and older, a phone number, an address, how many posts they have read, their timezone, and a membership level from a set of options.

Then, we'll use `times` to generate several profiles each with distinct, but determinisic data:

```js
const data = copycat.times(`profile`, 10, profile)
```

and then load using Prisma's create or createMany as needed.

### Considerations

- Seed scripts should be run over and over gracefully handle existing data
- Seed scripts should be small and run quickly.
- Seeds scripts are not data load scripts. They are intended to standup development environments
- If you need bulk loading, consider using separate `exec` scro[ts] that can bulk load production data using Postgres COPY and CSV files.
- SQLite vs Postgres, createMany vs individual promises. Limitations on nested write in createMany.

## Other Use Cases for 🐱 copycat

- Cell mocks
- Tests and Storybook that use mocks
- Scenario data
- Seeding dbAuth User and Passwords

---

# README

Welcome to [RedwoodJS](https://redwoodjs.com)!

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

````

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
````
