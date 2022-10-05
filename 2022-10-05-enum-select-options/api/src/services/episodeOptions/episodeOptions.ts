import { Episode } from '@prisma/client'
import type { QueryResolvers, EpisodeOption } from 'types/graphql'

import { label } from 'src/lib/helpers'

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
