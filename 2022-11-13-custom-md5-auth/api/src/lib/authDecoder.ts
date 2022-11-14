import { md5AuthDecoder } from './md5AuthDecoder'
import { AUTH_PROVIDER_TYPE as MD5_AUTH_PROVIDER_TYPE } from './md5AuthDecoder'

export const authDecoder = (token, type, req) => {
  switch (type) {
    case MD5_AUTH_PROVIDER_TYPE:
      return md5AuthDecoder(token, type, req)
  }

  throw new Error(type + ' is not a supported auth type')
}
