export const schema = gql`
  interface OptionItem {
    label: String!
  }

  type EpisodeOption implements OptionItem {
    value: Episode!
    label: String!
  }

  type Query {
    episodeOptions: [EpisodeOption!]! @skipAuth
  }
`
