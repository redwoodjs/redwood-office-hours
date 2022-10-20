import { copycat, fictional } from '@snaplet/copycat'
import { Input } from '@snaplet/copycat'
import type { Range } from 'fictional'

export const post = fictional.shape({
  title: copycat.sentence.options({ minWords: 3, maxWords: 5 }),
  content: copycat.paragraph.options({ minSentences: 2, maxSentences: 3 }),
  published: copycat.bool,
  tags: copycat.someOf([2, 3], [`tech`, `life`, `music`, `art`, `science`]),
})

export const onePost = (input: Input) => {
  return copycat.times(`post-${input}`, 1, post)[0]
}

export const severalPosts = (input: Input, range?: Range) => {
  return copycat.times(`post-${input}`, range || 1, post)
}
