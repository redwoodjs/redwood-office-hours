import {
  CurrentUser,
  createAuthentication,
  AuthImplementation,
} from '@redwoodjs/auth'

export type CustomUser = { username: string }

interface SignUpOptions {
  username: string
}

interface SignInOptions extends SignUpOptions {
  password: string
}

interface Md5Client {
  type: 'custom-md5-client'
  signIn: (options: SignInOptions) => void
  signUp: (options: SignUpOptions) => void
  signOut: () => void
  getAuthenticationBearerToken: () => string
  getUserProfile: () => string
}

export const md5Client = (): Md5Client => {
  return {
    type: 'custom-md5-client',
    signIn: (options: SignInOptions) => {
      console.debug('signIn', options)

      return
    },
    signOut: () => {
      console.debug('signOut')

      return
    },
    signUp: (options: SignUpOptions) => {
      console.debug('signUp', options)
      return
    },
    getAuthenticationBearerToken: () => {
      console.debug('getAuthenticationBearerToken')
      throw Error('Not implemented')
      return 'getToken'
    },
    getUserProfile: () => {
      console.debug('getUserProfile')
      // return null here means not authenticated
      return null
      // return 'getUserMetadata'
    },
  }
}

export function createCustomMd5Auth(
  customClient: Md5Client,
  customProviderHooks?: {
    useCurrentUser?: () => Promise<Record<string, unknown>>
    useHasRole?: (
      currentUser: CurrentUser | null
    ) => (rolesToCheck: string | string[]) => boolean
  }
) {
  console.log('createCustomMd5Auth')

  const authImplementation = createCustomMd5AuthImplementation(customClient)

  return createAuthentication(authImplementation, customProviderHooks)
}

function createCustomMd5AuthImplementation(customClient): AuthImplementation {
  console.log('createCustomMd5AuthImplementation')
  return {
    type: customClient.type,
    client: customClient,
    login: async ({ username, password }: SignInOptions) => {
      return customClient.signIn({ username, password })
    },
    logout: async () => {
      {
        return customClient.signOut()
      }
    },
    signup: async ({ username }: SignUpOptions) =>
      customClient.signUp({ username }),
    getToken: async () => {
      try {
        return customClient.getAuthenticationBearerToken()
      } catch {
        return null
      }
    },
    getUserMetadata: async () => {
      return customClient.getUserProfile()
    },
  }
}
