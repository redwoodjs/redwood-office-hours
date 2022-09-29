export const schema = gql`
  type Photo {
    id: Int!
    albumId: Int!
    title: String
    thumbnailUrl: String
    url: String
  }

  type Query {
    photo(id: Int!): Photo
      @rest(url: "https://jsonplaceholder.typicode.com/photos/:id")
      @skipAuth
    photos: [Photo]
      @rest(url: "https://jsonplaceholder.typicode.com/photos")
      @skipAuth
  }
`
