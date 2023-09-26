import React from 'https://esm.sh/react@18.2.0'
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts'

export const errorImage = new ImageResponse(
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
        background: '#bebebe',
        padding: 32,
      }}
    >
      Ooops.
    </div>
  )
)
