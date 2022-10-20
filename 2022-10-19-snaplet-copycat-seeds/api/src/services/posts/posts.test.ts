import type { Post } from '@prisma/client'

import { posts, post, createPost, updatePost, deletePost } from './posts'
import type { StandardScenario } from './posts.scenarios'
import { onePost } from 'src/lib/makers'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('posts', () => {
  scenario('returns all posts', async (scenario: StandardScenario) => {
    const result = await posts()

    expect(result.length).toEqual(Object.keys(scenario.post).length)
  })

  scenario('returns a single post', async (scenario: StandardScenario) => {
    const result = await post({ id: scenario.post.one.id })

    expect(result).toEqual(scenario.post.one)
  })

  scenario('creates a post', async () => {
    const result = await createPost({
      input: onePost('foo'),
    })

    expect(result.title).toEqual('Yuavi so misoa rako mi.')
    expect(result.content).toEqual(
      'Rako so somi rasovi sorasoa somiyuso, yu viyurami ra rasomira mi soviso virasomi viyua. Rakovi kovisora mirako somisora ko soayumi, mikomira ravi rakorami rami ra kovia. Koyura komiyuvi miamiyu somiyu soavi, korayuso raso raviyu rako sorami.'
    )
    expect(result.tags).toEqual(['art', 'tech'])
  })

  scenario('updates a post', async (scenario: StandardScenario) => {
    const original = (await post({ id: scenario.post.one.id })) as Post
    const result = await updatePost({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a post', async (scenario: StandardScenario) => {
    const original = (await deletePost({ id: scenario.post.one.id })) as Post
    const result = await post({ id: original.id })

    expect(result).toEqual(null)
  })
})
