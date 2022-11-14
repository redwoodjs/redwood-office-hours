import { createHash } from 'node:crypto'

import { Decoder } from '@redwoodjs/api'
import { logger } from 'src/lib/logger'

export const AUTH_PROVIDER_TYPE = 'md5-auth'

const md5 = (content) => {
  return createHash('md5').update(content).digest('hex')
}

export const md5AuthDecoder: Decoder = (token: string, type: string) => {
  if (type !== AUTH_PROVIDER_TYPE) {
    return null
  }

  if (!token) {
    return null
  }

  try {
    logger.debug({ custom: { token, type } }, 'md5AuthDecoder')

    const [username, hash] = token.split('||')

    logger.debug({ custom: { username, hash } }, 'md5AuthDecoder bits')

    if (!username || !hash) {
      throw 'Cannot access this'
    }

    const md5Hash = md5(username)

    logger.debug({ custom: { username, hash, md5Hash } }, 'md5AuthDecoder bits')

    if (hash !== md5Hash) {
      throw 'Cannot access this'
    }

    return Promise.resolve({ username })
  } catch (error) {
    return Promise.reject(error)
  }
}
