import { copycat, fictional } from '@snaplet/copycat'

export const company = fictional.join(' ', [
  copycat.word,
  copycat.oneOf([
    'Inc.',
    'Incorporated',
    'Ltd.',
    'Corp.',
    'Corporation',
    'Systems',
  ]),
])
