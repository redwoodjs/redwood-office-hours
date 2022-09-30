import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import rest from './rest'

const POSTS_JSON = [
  {
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
  },
  {
    userId: 1,
    id: 3,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
  },
  {
    userId: 1,
    id: 4,
    title: 'eum et est occaecati',
    body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
  },
]

jest.mock('cross-undici-fetch', () => ({
  fetch: (url) => {
    switch (url) {
      case 'https://example.com':
        return {
          ok: true,
          json: async () => {
            return POSTS_JSON
          },
        }
      case 'https://example.com/1':
        return {
          ok: true,
          json: async () => {
            return POSTS_JSON[0]
          },
        }
    }
  },
}))

describe('rest directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(rest.schema).toBeTruthy()
    expect(getDirectiveName(rest.schema)).toBe('rest')
  })

  it('errors if no url defined', async () => {
    const mockExecution = mockRedwoodDirective(rest, {
      mockedResolvedValue: '',
      directiveArgs: {},
    })

    await expect(mockExecution()).rejects.toThrowError('Missing required url')
  })

  describe('demonstrate use of directiveArgs', () => {
    it('with a url, returns the json response for that json api url', async () => {
      const mockExecution = mockRedwoodDirective(rest, {
        mockedResolvedValue: '',
        directiveArgs: { url: 'https://example.com' },
      })

      await expect(mockExecution()).resolves.toEqual(POSTS_JSON)
    })

    describe('demonstrate use of args for named parameter replacement', () => {
      it('with a url for a single item, returns the json response for that json api url', async () => {
        const mockExecution = mockRedwoodDirective(rest, {
          mockedResolvedValue: '',
          directiveArgs: { url: 'https://example.com/:id' },
          args: { id: 1 },
        })

        await expect(mockExecution()).resolves.toEqual(POSTS_JSON[0])
      })
    })
  })
})
