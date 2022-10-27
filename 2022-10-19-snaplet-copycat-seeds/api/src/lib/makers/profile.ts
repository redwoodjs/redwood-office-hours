import { copycat, fictional } from '@snaplet/copycat'
import { company } from './company'

export const profile = fictional.shape({
  firstName: copycat.firstName,
  lastName: copycat.lastName,
  bio: copycat.paragraph.options({ minSentences: 2, maxSentences: 3 }),
  dateOfBirth: copycat.dateString.options({ minYear: 1970, maxYear: 2000 }),
  phoneNumber: copycat.phoneNumber,
  company: company,
  postalAddress: copycat.postalAddress,
  membershipLevel: copycat.oneOf(['free', 'monthly', 'annual']),
  numberOfPostsRead: copycat.int.options({ min: 0, max: 20 }),
  timezone: copycat.timezone,
})
