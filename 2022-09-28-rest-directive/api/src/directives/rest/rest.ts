import { fetch } from 'cross-undici-fetch'

import { RedwoodError } from '@redwoodjs/api'
import {
  createTransformerDirective,
  TransformerDirectiveFunc,
} from '@redwoodjs/graphql-server'

import { logger } from 'src/lib/logger'

export const schema = gql`
  """
  Use @rest to fetch data from a REST API endpoint
  """
  directive @rest(url: String) on FIELD_DEFINITION
`

const replaceUrlNamedParameters = (args, directiveArgs): string => {
  if (directiveArgs.url) {
    let url = directiveArgs.url
    const params = [...directiveArgs.url.matchAll(/\/:(.+)/g)]

    params?.forEach((param) => {
      try {
        if (args[param[1]]) {
          logger.debug({ custom: { params, args } }, 'Replacing argument')
          url = url.replace(param[0], `/${args[param[1]]}`)
          logger.debug({ custom: { url } }, 'url')
        } else {
          logger.error(
            { custom: directiveArgs.url },
            'Missing required argument'
          )
          throw new RedwoodError('Missing required argument')
        }
      } catch (e) {
        logger.error(
          { custom: directiveArgs.url },
          'Could not replace argument'
        )
      }
    })

    return url
  }

  throw new RedwoodError('Missing required url')
}

const transform: TransformerDirectiveFunc = async ({ args, directiveArgs }) => {
  const url = replaceUrlNamedParameters(args, directiveArgs)

  try {
    logger.debug({ custom: url }, 'Fetching url ...')
    const res = await fetch(url)

    if (res.ok) {
      logger.debug({ custom: url }, 'Successfully fetched url')
      return await res.json()
    }
  } catch (e) {
    logger.error({ custom: url }, 'Unable to fetch url')

    throw new RedwoodError('Unable to fetch url')
  }
}
const rest = createTransformerDirective(schema, transform)

export default rest
