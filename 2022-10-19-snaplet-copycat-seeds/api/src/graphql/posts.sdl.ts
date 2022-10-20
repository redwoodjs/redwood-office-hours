export const schema = gql`
  type Post {
    id: Int!
    title: String!
    content: String!
    published: Boolean!
    profile: Profile
    profileId: Int
    tags: [String]!
  }

  type Query {
    posts: [Post!]! @requireAuth
    post(id: Int!): Post @requireAuth
  }

  input CreatePostInput {
    title: String!
    content: String!
    published: Boolean!
    profileId: Int
    tags: [String]!
  }

  input UpdatePostInput {
    title: String
    content: String
    published: Boolean
    profileId: Int
    tags: [String]!
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth
    updatePost(id: Int!, input: UpdatePostInput!): Post! @requireAuth
    deletePost(id: Int!): Post! @requireAuth
  }
`
