import React from 'https://esm.sh/react@18.2.0'
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts'
import { Context } from 'https://edge.netlify.com'

const key = crypto.subtle.importKey(
  'raw',
  new TextEncoder().encode('my_secret'),
  { name: 'HMAC', hash: { name: 'SHA-256' } },
  false,
  ['sign']
)

function toHex(arrayBuffer: ArrayBuffer) {
  return Array.prototype.map
    .call(new Uint8Array(arrayBuffer), (n) => n.toString(16).padStart(2, '0'))
    .join('')
}

// http://localhost:8888/og/encrypted?id=a&token=634dd7e46ec814fb105074b73e26755b0d9966c031dca05d7e7cc65a1619058e

export default async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url)

    const id = searchParams.get('id')
    const token = searchParams.get('token')

    const verifyToken = toHex(
      await crypto.subtle.sign(
        'HMAC',
        await key,
        new TextEncoder().encode(JSON.stringify({ id }))
      )
    )

    if (token !== verifyToken) {
      return new Response('Invalid token.', { status: 401 })
    }

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
