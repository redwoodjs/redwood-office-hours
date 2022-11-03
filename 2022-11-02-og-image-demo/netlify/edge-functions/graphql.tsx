import React from 'https://esm.sh/react@18.2.0'
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts'
import { Request, Context } from 'https://edge.netlify.com'

import { errorImage } from './lib/errors.tsx'
import { graphqlUrl } from './lib/urls.ts'

export default async (request: Request, context: Context) => {
  const graphqlQuery = `query {
    redwood {
      version
      prismaVersion
    }
    images {
      id
      name
      description
    }
  }`

  const variables = {}
  const headers = {}

  try {
    const image = await fetch(graphqlUrl(request), {
      method: 'POST',
      body: JSON.stringify({
        query: graphqlQuery,
        variables,
        headers,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}.`)
        }

        return response.json()
      })
      .then((payload) => {
        const { data } = payload

        console.log(data)

        return new ImageResponse(
          (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'center',
                flexDirection: 'column',
                // fontSize: 12,
                color: 'white',
                background: '#bebebe',
                padding: 16,
              }}
            >
              {data.images.map((image) => (
                <p key={image.id} tw="m-0 p-0 text-lg">
                  {image.name} {image.description}
                </p>
              ))}
            </div>
          )
        )
      })
      .catch((error) => {
        console.error(error)
        return errorImage
      })

    return image
  } catch (e) {
    console.error(e)

    return errorImage
  }
}
