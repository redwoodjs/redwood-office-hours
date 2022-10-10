# How to Build an AutoComplete widget with RedwoodJS GraphQL API and Algolia UI Libraries

👉 Demo: [https://rw-office-hours-algolia-autocomplete.netlify.app](https://rw-office-hours-algolia-autocomplete.netlify.app)

Autocomplete is an open source, production-ready JavaScript library for building autocomplete experiences.

A user types into an input, and the autocomplete “completes” their thought by providing full terms or results: this is the very base of an autocomplete experience.

See: https://www.algolia.com/doc/ui-libraries/autocomplete/introduction/what-is-autocomplete/

- @algolia/autocomplete-js
- @algolia/autocomplete-theme-classic

## Why

Your application may need a way to find and navigate to a page, but you do not want to list out hundreds or thousands of items for the user to pick.

You can instead let them search for a record and present them with matches to pick from.

## Implementation

- [Autocomplete Component](2022-10-12-algolia-autocomplete/web/src/components/Autocomplete/Autocomplete.tsx) - Implements the Algolgia widget as well as debounce helpers
- [PersonAutocomplete Component](2022-10-12-algolia-autocomplete/web/src/components/PersonAutocomplete/PersonAutocomplete.tsx) - Defines the GraphQL query to search and what to render as results
- [autocomplete SDL](2022-10-12-algolia-autocomplete/api/src/graphql/autocomplete.sdl.ts) and [service](2022-10-12-algolia-autocomplete/api/src/services/autocomplete/autocomplete.ts) - Defines the GraphQL API to search for people by postalAddress

The SDL

```javascript
export const schema = gql`
  input AutocompleteInput {
    query: String!
  }

  type Query {
    autocomplete(input: AutocompleteInput): [Person!]! @requireAuth
  }
`
```

defines the query used to search.

The service

```javascript
export const autocomplete: QueryResolvers['autocomplete'] = ({ input }) => {
  return db.person.findMany({
    where: {
      OR: [
        { postalAddress: { contains: input.query, mode: 'insensitive' } },
        { fullName: { contains: input.query, mode: 'insensitive' } },
      ],
    },
    take: 10,
    orderBy: { postalAddress: 'asc' },
  })
}
```

uses Prisma's `contains` filter to find `postalAddress`es or `fullName`s that contain the search query.

We can leverage Postgres

```SQL
CREATE INDEX IF NOT EXISTS index_entity_on_fullname_like
  ON "demo_algolia_autocomplete"."Person"
  USING btree
  ("fullName" COLLATE pg_catalog."default");


CREATE INDEX IF NOT EXISTS index_entity_on_postal_address_like
  ON "demo_algolia_autocomplete"."Person"
  USING btree
  ("postalAddress" COLLATE pg_catalog."default");
```

> Note: Debounce is uses to limit the API requests made while typing in the search so that it doesn't fire too often. There is a slight wait before the query is made after each keystroke.

### Postgres Optimizations

You can help optimize the "like" search by creating some indexes:

```sql
CREATE INDEX IF NOT EXISTS index_entity_on_fullname_like
  ON "demo_algolia_autocomplete"."Person"
  USING btree
  ("fullName" COLLATE pg_catalog."default");


CREATE INDEX IF NOT EXISTS index_entity_on_postal_address_like
  ON "demo_algolia_autocomplete"."Person"
  USING btree
  ("postalAddress" COLLATE pg_catalog."default");
```

and also

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS trgm_idx_person_postal_addreess ON "demo_algolia_autocomplete"."Person" USING gin ("postalAddress" gin_trgm_ops);

CREATE INDEX IF NOT EXISTS trgm_idx_person_full_name ON "demo_algolia_autocomplete"."Person" USING gin ("fullName" gin_trgm_ops);
```

> The pg_trgm module provides functions and operators for determining the similarity of ASCII alphanumeric text based on trigram matching, as well as index operator classes that support fast searching for similar strings.

Postgres uses trigrams to break down strings into smaller chunks and index them efficiently. The pg_trgm module supports GIST or GIN indexes and as of Postgres version 9.1 these indexes support LIKE/ILIKE queries.

## Setup

- Setup Postgres (for collated index to help with search)
- yarn rw db migrate dev
- yarn prisma db seed for fake data (full name and postal addresses)
- yarn rw dev

## Use

- Searches for postal address with 3 character limit and debounce
- For example, search for countries

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
