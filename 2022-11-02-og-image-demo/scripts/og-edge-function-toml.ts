import fs from 'fs'
import path from 'path'

// To access your database
// Append api/* to import from api and web/* to import from web
import { db } from 'api/src/lib/db'

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)

  const images = await db.image.findMany()

  const netlifyToml = fs.readFileSync(
    path.join(__dirname, '../netlify.toml.template'),
    'utf8'
  )

  const toml = images.map((image) => {
    return `
# Example for ${image.name} - ${image.description}
[[edge_functions]]
function = "${image.function}"
path = "${image.path}"
`
  })

  const tomlWithEdgeFunctions = netlifyToml + toml.join('')

  fs.writeFileSync(
    path.join(__dirname, '../netlify.toml'),
    tomlWithEdgeFunctions,
    'utf8'
  )

  console.log(tomlWithEdgeFunctions)
  console.log('Write netlify.toml with edge functions')
}
