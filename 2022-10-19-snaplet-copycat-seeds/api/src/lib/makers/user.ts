import { copycat, fictional } from '@snaplet/copycat'

export const user = fictional.shape({
  email: copycat.email,
})
