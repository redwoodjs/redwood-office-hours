import md5 from 'md5'

import { createAuthentication } from '@redwoodjs/auth'

import { getTokenAsync, setTokenAsync, clearTokenAsync } from './tokenStorage'
import type { Md5AuthClient, SignInOptions, SignUpOptions, User } from './types'

const AUTH_PROVIDER_TYPE = 'md5-auth'
const TOKEN_KEY = 'md5-auth-token'

const encodeUserPassword = (user: User) => {
  return md5(user.username)
}

const encodeUserToken = (user: User) => {
  return `${user.username}||${encodeUserPassword(user)}`
}

// Replace this with the auth service provider client sdk
const customClient = {
  login: async (options: SignInOptions) => {
    console.debug('login', options)

    const user = { id: options.username, username: options.username, roles: [] }

    const encodedPassword = encodeUserPassword(user)

    if (encodedPassword === options.password) {
      const token = `${user.username}||${options.password}`

      setTokenAsync(TOKEN_KEY, token)

      return user
    }

    return null
  },
  signup: async (options: SignUpOptions) => {
    const user = { id: options.username, username: options.username, roles: [] }
    const token = encodeUserToken(user)

    setTokenAsync(TOKEN_KEY, token)

    return user
  },
  logout: async () => {
    await clearTokenAsync(TOKEN_KEY)
  },
  getToken: async () => {
    const token = await getTokenAsync(TOKEN_KEY)

    if (token) return token as string

    return null
  },
  getUserMetadata: async () => {
    const token = (await getTokenAsync(TOKEN_KEY)) as string

    if (token) {
      const [username, hash] = token.split('||')

      return {
        id: username,
        username: username,
        roles: [],
      }
    }

    return null
  },
}

export const createCustomMd5Auth = () => {
  const authImplementation = createCustomMd5AuthImplementation(customClient)

  // You can pass custom provider hooks here if you need to as a second
  // argument. See the Redwood framework source code for how that's used
  return createAuthentication(authImplementation)
}

// This is where most of the integration work will take place. You should keep
// the shape of this object (i.e. keep all the key names) but change all the
// values/functions to use methods from the auth service provider client sdk
// you're integrating with
const createCustomMd5AuthImplementation = (customClient: Md5AuthClient) => {
  return {
    type: AUTH_PROVIDER_TYPE,
    client: customClient,
    login: async (options: SignInOptions) => await customClient.login(options),
    logout: async () => await customClient.logout(),
    signup: async (options: SignUpOptions) =>
      await customClient.signup(options),
    getToken: async () => await customClient.getToken(),
    getUserMetadata: async () => await customClient.getUserMetadata(),
  }
}
