import md5 from 'md5'

import { createAuthentication } from '@redwoodjs/auth'

import { localStorageAdapter } from './storage'
import type { Md5AuthClient, SignInOptions, SignUpOptions, User } from './types'

const AUTH_PROVIDER_TYPE = 'md5-auth'
const TOKEN_KEY = 'md5-auth-token'

/**
 * About This Custom Auth Example
 *
 * Here we showcase how a developer might implement custom authentication to "roll-your-own" authentication
 * or implement an Authentication Provider that as yet RedwoodJS doesn't support.
 * This example is a contrived example to demonstrate what one needs to do
 * to implement the basics of an authentication client/provider.
 *
 * It simply uses the MD5 message-digest algorithm to generate a password
 * from the supplied username.
 *
 * It is not a secure authentication provider and should not be used in a
 * real-world application.
 */

// The md5 hash of the username is the password
const encodeUserPassword = (user: User) => {
  return md5(user.username)
}

// The token is the username and the md5 hash of the username
// For example, if the username is "md5auth", the token would be
// "md5auth||3aa27b6f0599c098862c55ca5cfc64bc"
const encodeUserToken = (user: User) => {
  return `${user.username}||${encodeUserPassword(user)}`
}

// Implements the custom auth client
const customClient = {
  // The login method accepts the form post with a username and password and
  // checks that the password provided matches the MD5 hashed username.
  login: (options: SignInOptions) => {
    console.debug('login', options)

    const user = { id: options.username, username: options.username, roles: [] }

    const encodedUsername = encodeUserPassword(user)

    if (encodedUsername === options.password) {
      const token = `${user.username}||${options.password}`

      localStorageAdapter.setItem(TOKEN_KEY, token)

      return user
    }

    return null
  },
  /**
   * The signup method accepts the form post with a username and
   * sets the authentication token in localStorage
   * to the MD5 hashed username in the key `md5-auth-token`.
   * The token takes the shape username||password where
   * password is the md5 hash digest of the username.
   *
   * For example, the username `md5auth` has password `3aa27b6f0599c098862c55ca5cfc64bc`.
   *
   * The token would be `md5auth||3aa27b6f0599c098862c55ca5cfc64bc`
   * @returns
   */

  signup: (options: SignUpOptions) => {
    const user = { id: options.username, username: options.username, roles: [] }
    const token = encodeUserToken(user)

    localStorageAdapter.setItem(TOKEN_KEY, token)

    return user
  },
  // The logout method removes the token `md5-auth-token` from localStorage.
  logout: () => {
    localStorageAdapter.removeItem(TOKEN_KEY)
  },
  // The getToken method gets the authentication token from localStorage with the key `md5-auth-token` (set in signup). This value is
  //used to set the Authorization header when making secure GraphQL requests.
  getToken: () => {
    const token = localStorageAdapter.getItem(TOKEN_KEY)

    if (token) return token as string

    return null
  },
  /**
   * The getUserMetadata methods gets the authentication token from localStorage in the key `md5-auth-token`
   * in the shape username||password and returns a json object with the username to
   * represent a User with and id, username and roles.
   *
   * Important!: This `getUserMetadata` methods determines if the user is authenticated or not.
   *
   * Returning `null`` here means the user is not authenticated.
   *
   */
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
/**
 * These are used in your application's auth.js|ts file to create the auth provider.
 *
 * import { createCustomMd5Auth } from './md5Auth'
 * export const { AuthProvider, useAuth } = createCustomMd5Auth()
 *
 * It exposed the `useAuth` hook that can be used in your components to get the currentUser
 * and other authentication related methods (login, logout, isAuthenticated).
 */

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
