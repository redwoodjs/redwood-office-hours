# How To Build a REST directive with RedwoodJS Transformer Directives

Inspired by [Build a REST directive with GraphQL Tools](https://graphql.wtf/episodes/61-custom-rest-directive-with-graphql-tools) by [Jaime Barton](https://twitter.com/notrab) which you can watch here:

[![Video](https://i.ytimg.com/vi/KZf_Hw0JRE0/maxresdefault.jpg)](https://www.youtube.com/watch?v=KZf_Hw0JRE0/)

Jaime shows you how to build a custom @rest directive with GraphQL Tools to resolve data from a JSON API -- but, we'll use [Redwood Directives](https://redwoodjs.com/docs/directives) instead to show how you can still implement this feature but not have to go deep into the GraphQL structure.

And ... we'll add a way to fetch a single item from a JSON API ... and tests!

## Live Demo!!!

👉 [Live Demo on Netlify](https://rw-office-hours-rest-directive.netlify.app)

# Using a RedwoodJS Directive

[Redwood Directives](https://redwoodjs.com/docs/directives) are a powerful feature, supercharging your GraphQL-backed Services.

You can think of directives like "middleware" that let you run reusable code during GraphQL execution to perform tasks like authentication and formatting.

Redwood uses them to make it a snap to protect your API Services from unauthorized access.

Here we call those types of directives Validators.

You can also use them to transform the output of your query result to modify string values, format dates, shield sensitive data, and more! We call those types of directives Transformers.

We'll be using the Transformer Directive type to imoplemen the `@rest` directive.

### Generating the Directive

- yarn rw g directive rest --type=transformer
- rest-directive % yarn workspace api add cross-undici-fetch

### Implement the SDL

We'll use the `https://jsonplaceholder.typicode.com` JSON api demo to get Photos and Posts.

You can [browse the JSON response](https://jsonplaceholder.typicode.com/posts) for `https://jsonplaceholder.typicode.com/posts` to see how we match the SDL type `Post` to the example data:

```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  },
  ...
]
```

#### For Posts

```js
// api/src/graphql/posts.sdl.ts

export const schema = gql`
  type Post {
    id: Int!
    title: String @uppercase
    body: String
    userId: String
  }

  type Query {
    post(id: Int!): Post
      @rest(url: "https://jsonplaceholder.typicode.com/posts/:id")
      @skipAuth
    posts: [Post]
      @rest(url: "https://jsonplaceholder.typicode.com/posts")
      @skipAuth
  }
`
```

[Posts SDL Code](api/src/graphql/posts.sdl.ts)

#### For Photos

```js
// api/src/graphql/photos.sdl.ts

export const schema = gql`
  type Photo {
    id: Int!
    albumId: Int!
    title: String
    thumbnailUrl: String
    userId: String
  }

  type Query {
    photo(id: Int!): Photo
      @rest(url: "https://jsonplaceholder.typicode.com/photo/:id")
      @skipAuth
    photos: [Photo]
      @rest(url: "https://jsonplaceholder.typicode.com/photos")
      @skipAuth
  }
`
```

[Photos SDL Code](api/src/graphql/photos.sdl.ts)

### Implement @rest directive

You can see the full [@rest transformer directive implementation](2022-09-28-rest-directive/api/src/directives/rest/rest.ts).

TLDR;

- It extracts the `url` set in the directive from it `directiveArgs`
- Extracts any query `args` to be used to replace the named parameters.
- Replace those params if needed (this is for the fetch post by by query)
- Construct a url
- Fetch from this url
- Return the response

[@rest Directive Code](api/src/directives/rest/rest.ts)

#### Testing

Yes, you can mock the JSON API response to test that your directive resturns the expected data.

See how the `mockRedwoodDirective` testing utility let's you pass in the directiveArtgs and args for the url with a mocked response:

```js
// api/src/directives/rest/rest.test.ts

jest.mock('cross-undici-fetch', () => ({
  fetch: (url) => {
    switch (url) {
      case 'https://example.com':
        return {
          ok: true,
          json: async () => {
            return POSTS_JSON
          },
        }
      case 'https://example.com/1':
        return {
          ok: true,
          json: async () => {
            return POSTS_JSON[0]
          },
        }
    }
  },
}))

// ...

describe('demonstrate use of args for named parameter replacement', () => {
  it('with a url for a single item, returns the json response for that json api url', async () => {
    const mockExecution = mockRedwoodDirective(rest, {
      mockedResolvedValue: '',
      directiveArgs: { url: 'https://example.com/:id' },
      args: { id: 1 },
    })

    await expect(mockExecution()).resolves.toEqual(POSTS_JSON[0])
  })
})
```

See [@rest Directive Unit Test Code](api/src/directives/rest/rest.test.ts)

## App

Now with these SDL and Directives you can query the [RedwoodJS GraphQL API](https://redwoodjs.com/docs/graphql) and use [RedwoodJS cells](https://redwoodjs.com/docs/cells) to [render Posts](https://rw-office-hours-rest-directive.netlify.app/posts) and [photos](https://rw-office-hours-rest-directive.netlify.app/photos) -- live examples!

See the [web side](web) code for this.

## Ideas to Improve the @rest directive

- Add `headers` so can pass api tokens or other Authorization headers
- Support `POST` and `GET` methods
- Chain with another Transformer directive to reshape the response (transform JSON API data to match a different SDL) (maybe?)

## Setup

Welcome to [RedwoodJS](https://redwoodjs.com)!

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```bash
yarn install
```

Then change into that directory and start the development server:

```bash
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

## Next Steps

The best way to learn Redwood is by going through the comprehensive [tutorial](https://redwoodjs.com/docs/tutorial/foreword) and joining the community (via the [Discourse forum](https://community.redwoodjs.com) or the [Discord server](https://discord.gg/redwoodjs)).

## Quick Links

- Stay updated: read [Forum announcements](https://community.redwoodjs.com/c/announcements/5), follow us on [Twitter](https://twitter.com/redwoodjs), and subscribe to the [newsletter](https://redwoodjs.com/newsletter)
- [Learn how to contribute](https://redwoodjs.com/docs/contributing)
