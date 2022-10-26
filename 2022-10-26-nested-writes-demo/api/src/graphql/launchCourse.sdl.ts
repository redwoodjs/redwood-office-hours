export const schema = gql`
  input StudentEnrollInput {
    id: Int!
  }
  input LaunchCourseInput {
    course: CreateCourseInput!
    studentIds: [StudentEnrollInput!]!
  }

  type Mutation {
    launchCourse(input: LaunchCourseInput!): Course! @requireAuth
  }
`
