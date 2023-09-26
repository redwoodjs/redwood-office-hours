import {
  createCache,
  InMemoryClient,
  MemcachedClient,
} from '@redwoodjs/api/cache'

import { logger } from './logger'

const memJsFormattedLogger = {
  log: (msg: string) => logger.error(msg),
}

export let client: InMemoryClient | MemcachedClient

if (process.env.NODE_ENV === 'test') {
  client = new InMemoryClient()
} else {
  try {
    client = new MemcachedClient(process.env.CACHE_HOST, {
      logger: memJsFormattedLogger,
    })
  } catch (e) {
    logger.error(`Could not connect to cache: ${e.message}`)
  }
}

export const { cache, cacheFindMany } = createCache(client, {
  logger,
  timeout: 500,
})
