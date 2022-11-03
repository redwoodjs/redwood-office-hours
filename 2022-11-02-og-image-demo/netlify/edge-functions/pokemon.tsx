import React from 'https://esm.sh/react@18.2.0'
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts'
import { Context } from 'https://edge.netlify.com'

import { errorImage } from './lib/errors.tsx'

export default async (request: Request, context: Context) => {
  const DEFAULT_POKEMON = 'pikachu'
  const POKEMON_PATTERN = new URLPattern({ pathname: '/*/p/:pokemonName' })

  try {
    const pokemonName =
      POKEMON_PATTERN.exec(
        request.url
      )?.pathname?.groups?.pokemonName?.toLowerCase() || DEFAULT_POKEMON

    const image = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status}. Could not find pokemon named: "${pokemonName}"`
          )
        }

        return response.json()
      })
      .then((data) => {
        return new ImageResponse(
          (
            <section
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                fontSize: 24,
                color: 'white',
                background: '#bebebe',
                padding: 16,
              }}
            >
              <img src={data.sprites.front_default} height="320" />
              {data.species.name}
            </section>
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
