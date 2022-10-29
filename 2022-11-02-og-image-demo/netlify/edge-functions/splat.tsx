import React from 'https://esm.sh/react@18.2.0'
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts'
import { Context } from 'https://edge.netlify.com'

export default async function handler(req: Request, context: Context) {
  context.log(req.url)

  const pattern = new URLPattern('http{s}?://*:*/*/books/:id')
  context.log(pattern)

  let match = pattern.exec(req.url)

  context.log(match)
  context.log(match.pathname.groups.id.toString())

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 72,
          color: 'white',
          background: '#BF4722',
          padding: 32,
        }}
      >
        {match.pathname.groups.id.toString()}
      </div>
    )
  )
}
