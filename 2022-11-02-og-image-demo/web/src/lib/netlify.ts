import { routes } from '@redwoodjs/router'

export const canonicalBaseUrl = () => {
  let result = process.env.URL

  if (process.env.NETLIFY === 'true') {
    if (process.env.branch === 'main') {
      result = process.env.URL
    } else {
      result = process.env.DEPLOY_URL
    }
  }

  return result
}
