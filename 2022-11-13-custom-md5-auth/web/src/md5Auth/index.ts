import md5 from 'md5'

import { createAuthentication } from '@redwoodjs/auth'

import { localStorageAdapter } from './storage'
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
  login: (options: SignInOptions) => {
    console.debug('login', options)

    const user = { id: options.username, username: options.username, roles: [] }

    const encodedPassword = encodeUserPassword(user)

    if (encodedPassword === options.password) {
      const token = `${user.username}||${options.password}`

      localStorageAdapter.setItem(TOKEN_KEY, token)

      return user
    }

    return null
  },
  signup: (options: SignUpOptions) => {
    const user = { id: options.username, username: options.username, roles: [] }
    const token = encodeUserToken(user)

    localStorageAdapter.setItem(TOKEN_KEY, token)

    return user
  },
  logout: () => {
    localStorageAdapter.removeItem(TOKEN_KEY)
  },
  getToken: () => {
    const token = localStorageAdapter.getItem(TOKEN_KEY)

    if (token) return token as string

    return null
  },
  getUserMetadata: () => {
    const token = localStorageAdapter.getItem(TOKEN_KEY) as string

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
    login: async (options: SignInOptions) => customClient.login(options),
    logout: async () => customClient.logout(),
    signup: async (options: SignUpOptions) => customClient.signup(options),
    getToken: async () => customClient.getToken(),
    getUserMetadata: async () => customClient.getUserMetadata(),
  }
}
