import type { Profile } from '@prisma/client'

import {
  profiles,
  profile,
  createProfile,
  updateProfile,
  deleteProfile,
} from './profiles'
import type { StandardScenario } from './profiles.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('profiles', () => {
  scenario('returns all profiles', async (scenario: StandardScenario) => {
    const result = await profiles()

    expect(result.length).toEqual(Object.keys(scenario.profile).length)
  })

  scenario('returns a single profile', async (scenario: StandardScenario) => {
    const result = await profile({ id: scenario.profile.one.id })

    expect(result).toEqual(scenario.profile.one)
  })

  scenario('creates a profile', async () => {
    const result = await createProfile({
      input: {
        email: 'String5354588',
        name: 'String',
        birthday: '2023-02-20T17:56:24.695Z',
      },
    })

    expect(result.email).toEqual('String5354588')
    expect(result.name).toEqual('String')
    expect(result.birthday).toEqual(new Date('2023-02-20T17:56:24.695Z'))
  })

  scenario('updates a profile', async (scenario: StandardScenario) => {
    const original = (await profile({ id: scenario.profile.one.id })) as Profile
    const result = await updateProfile({
      id: original.id,
      input: { email: 'String89620812' },
    })

    expect(result.email).toEqual('String89620812')
  })

  scenario('deletes a profile', async (scenario: StandardScenario) => {
    const original = (await deleteProfile({
      id: scenario.profile.one.id,
    })) as Profile
    const result = await profile({ id: original.id })

    expect(result).toEqual(null)
  })
})
