export const schema = gql`
  type Course {
    id: Int!
    title: String!
    description: String!
    subject: Subject!
    students: [Student]!
  }

  enum Subject {
    ARCHITECTURE
    CHEMISTRY
    BIOLOGY
    ENGINEERING
    HISTORY
    HUMANITIES
    LITERATURE
    MATHEMATICS
    MUSIC
    PHYSICS
  }

  type Query {
    courses: [Course!]! @requireAuth
    course(id: Int!): Course @requireAuth
  }

  input CreateCourseInput {
    title: String!
    description: String!
    subject: Subject!
  }

  input UpdateCourseInput {
    title: String
    description: String
    subject: Subject
  }

  type Mutation {
    createCourse(input: CreateCourseInput!): Course! @requireAuth
    updateCourse(id: Int!, input: UpdateCourseInput!): Course! @requireAuth
    deleteCourse(id: Int!): Course! @requireAuth
  }
`
