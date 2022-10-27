export const schema = gql`
  type Student {
    id: Int!
    name: String!
    major: Subject!
    course: Course
    courseId: Int
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
    students: [Student!]! @requireAuth
    student(id: Int!): Student @requireAuth
  }

  input CreateStudentInput {
    name: String!
    major: Subject!
    courseId: Int
  }

  input UpdateStudentInput {
    name: String
    major: Subject
    courseId: Int
  }

  type Mutation {
    createStudent(input: CreateStudentInput!): Student! @requireAuth
    updateStudent(id: Int!, input: UpdateStudentInput!): Student! @requireAuth
    deleteStudent(id: Int!): Student! @requireAuth
  }
`
