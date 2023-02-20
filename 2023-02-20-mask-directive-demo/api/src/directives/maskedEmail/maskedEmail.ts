import {
  createTransformerDirective,
  TransformerDirectiveFunc,
} from '@redwoodjs/graphql-server'
import { logger } from 'src/lib/logger'

export const schema = gql`
  """
  Use @maskedEmail to transform the resolved value to return a modified result.
  """
  directive @maskedEmail on FIELD_DEFINITION
`

const transform: TransformerDirectiveFunc = ({ context, resolvedValue }) => {
  /**
   * Write your transformation logic inside this function.
   * Transformer directives run **after** resolving the value
   *
   * - You can also throw an error, if you want to stop executing, but note that the value has already been resolved
   * - Transformer directives **must** be synchronous, and return a value
   **/

  // currentUser is only available when auth is setup.
  logger.debug(
    { currentUser: context.currentUser },
    'currentUser in maskedEmail directive'
  )

  // ... you can modify the resolvedValue and return it
  logger.debug(resolvedValue, 'resolvedValue in maskedEmail directive')

  // You can also modify your directive to take arguments
  // and use the directiveArgs object provided to this function to get values
  // See documentation here: https://redwoodjs.com/docs/directives
  const [username, domain] = resolvedValue.split('@')
  const maskerUsername = username.slice(0, 1) + '*'.repeat(username.length - 1)
  const maskedTld = domain.split(/\./).pop()
  const maskedDomain =
    '*'.repeat(domain.length - maskedTld.length - 1) + '.' + maskedTld
  const masked = `${maskerUsername}@${maskedDomain}`

  logger.debug(
    { custom: { maskedEmail: masked, email: resolvedValue } },
    'masking email address'
  )

  return masked
}

const maskedEmail = createTransformerDirective(schema, transform)

export default maskedEmail
