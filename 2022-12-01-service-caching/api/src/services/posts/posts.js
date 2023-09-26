import { cache, cacheFindMany } from 'src/lib/cache'
import { db } from 'src/lib/db'

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const posts = () => {
  return cacheFindMany(`posts`, db.post)
}

export const post = async ({ id }) => {
  return cache(['post', id], async () => {
    await delay(2000)
    return db.post.findUnique({
      where: { id },
    })
  })
}

export const createPost = ({ input }) => {
  return db.post.create({
    data: input,
  })
}

export const updatePost = ({ id, input }) => {
  return db.post.update({
    data: input,
    where: { id },
  })
}

export const deletePost = ({ id }) => {
  return db.post.delete({
    where: { id },
  })
}
