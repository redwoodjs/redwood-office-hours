import { md5Client, createCustomMd5Auth } from './md5Auth'

const customClient = md5Client()
export const { AuthProvider, useAuth } = createCustomMd5Auth(customClient)
