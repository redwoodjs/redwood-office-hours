export interface Md5AuthClient {
  login: (options: SignInOptions) => User
  logout: () => void
  signup: (options: SignUpOptions) => User
  getToken: () => string
  getUserMetadata: () => User | null
}

// This type should be inferred from the general interface above
export interface User {
  // The name of the id variable will vary depending on what auth service
  // provider you're integrating with. Another common name is `sub`
  id: string
  email?: string
  username?: string
  roles: string[]
}

export interface SignUpOptions {
  username: string
}

export interface SignInOptions extends SignUpOptions {
  password: string
}

// This type should be inferred from the general interface above
export interface ValidateResetTokenResponse {
  error?: string
  [key: string]: string | undefined
}
