import { Request, Context } from 'https://edge.netlify.com'

export const graphqlUrl = (request: Request): string => {
  const { protocol, host } = new URL(request.url)

  const api = protocol + '//' + (host || 'localhost')
  const requestUrl = new URL(api)
  requestUrl.host = host
  requestUrl.pathname = '.netlify/functions/graphql'

  return requestUrl.toString()
}
