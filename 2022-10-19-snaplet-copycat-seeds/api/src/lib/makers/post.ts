import { copycat, fictional } from '@snaplet/copycat'

export const post = fictional.shape({
  title: copycat.sentence.options({ minWords: 3, maxWords: 5 }),
  content: copycat.paragraph.options({ minSentences: 2, maxSentences: 3 }),
  published: copycat.bool,
  tags: copycat.someOf([2, 3], [`tech`, `life`, `music`, `art`, `science`]),
})
