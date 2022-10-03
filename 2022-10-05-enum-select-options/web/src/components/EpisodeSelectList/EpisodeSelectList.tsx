import { SelectField } from '@redwoodjs/forms'
import { useMutation, useQuery } from '@redwoodjs/web'

import type { Character } from 'types/graphql'

export const GET_EPISODE_SELECT_LIST = gql`
  query GetEpisodeOptions {
    episodeOptions {
      value
      label
    }
  }
`

const EpisodeSelectList = (character: Character) => {
  const { data } = useQuery(GET_EPISODE_SELECT_LIST)
  console.log(character)
  return (
    <SelectField
      className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
      name="appearsIn"
      multiple={true}
      validation={{ required: true }}
    >
      {data.episodeOptions?.map((episode) => {
        return (
          <option
            key={episode.value}
            className="text-gray-900"
            value={episode.value}
            selected={character?.appearsIn?.includes(episode.value)}
          >
            {episode.label}
          </option>
        )
      })}
    </SelectField>
  )
}

export default EpisodeSelectList
