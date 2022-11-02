import React from 'https://esm.sh/react@18.2.0'
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts'
import { Context } from 'https://edge.netlify.com'
import { verifyToken } from './lib/secure.ts'

export default async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url)

    const id = searchParams.get('id')
    const token = searchParams.get('token')

    console.log(token, id)
    await verifyToken(token, id)

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 128,
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {id}
        </div>
      ),
      {
        width: 1200,
        height: 600,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
