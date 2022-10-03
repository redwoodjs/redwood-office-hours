import { Episode } from '@prisma/client'
import type { QueryResolvers, EpisodeOption } from 'types/graphql'

const label = (str: string) => {
  return str
    .toLowerCase()
    .split('_')
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase())
    })
    .join(' ')
}

const getEnumValues = (enumType: Record<string, string>) => {
  return Object.values(enumType).map((value) => {
    return {
      value,
      label: label(value),
    }
  })
}

export const episodeOptions: QueryResolvers['episodeOptions'] = () => {
  return getEnumValues(Episode) as EpisodeOption[]
}
