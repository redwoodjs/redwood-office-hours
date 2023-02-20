import {
  createTransformerDirective,
  TransformerDirectiveFunc,
} from '@redwoodjs/graphql-server'
import { logger } from 'src/lib/logger'

export const schema = gql`
  """
  Use @yearOnly to transform the resolved value to return a modified result.
  """
  directive @yearOnly on FIELD_DEFINITION
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
    'currentUser in yearOnly directive'
  )

  // ... you can modify the resolvedValue and return it
  logger.debug(resolvedValue, 'resolvedValue in yearOnly directive')

  // You can also modify your directive to take arguments
  // and use the directiveArgs object provided to this function to get values
  // See documentation here: https://redwoodjs.com/docs/directives

  const year = new Date(resolvedValue).getFullYear()

  const returnDate = new Date(Date.parse(`${year}-01-01T00:00:00.000Z`))

  logger.debug({ custom: returnDate }, 'returnDate in yearOnly directive')

  return returnDate
}

const yearOnly = createTransformerDirective(schema, transform)

export default yearOnly
