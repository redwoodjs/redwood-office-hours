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
