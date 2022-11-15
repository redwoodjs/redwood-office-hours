import { md5 } from 'src/lib/md5AuthDecoder'
export const secret = () => {
  const password = md5(context.currentUser.username)
  return {
    message: `Your secret password is ${password}`,
    password,
  }
}
