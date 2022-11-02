const SECRET = Deno.env.get('SIGN_IMAGE_SECRET') || 'my_secret'

const key = crypto.subtle.importKey(
  'raw',
  new TextEncoder().encode(SECRET),
  { name: 'HMAC', hash: { name: 'SHA-256' } },
  false,
  ['sign']
)

const toHex = (arrayBuffer: ArrayBuffer) => {
  return Array.prototype.map
    .call(new Uint8Array(arrayBuffer), (n) => n.toString(16).padStart(2, '0'))
    .join('')
}

export const verifyToken = async (signature, id) => {
  const token = toHex(
    await crypto.subtle.sign(
      'HMAC',
      await key,
      new TextEncoder().encode(JSON.stringify({ id }))
    )
  )

  console.log(signature, token, id)

  if (token !== signature) {
    console.error('Invalid token')
    throw new Error('Invalid token')
    // return new Response('Invalid token.', { status: 401 })
  }

  return
}
