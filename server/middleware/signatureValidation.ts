import crypto from 'crypto'

function getSignatureString (signature: string | string[]): string {
  if (Array.isArray(signature)) {
    console.log('Warning: Received more than one signature. Using the first one.')
  }

  return Array.isArray(signature) ? signature[0] : signature
}

function isSignatureValid (secret: string, signature: string, body: string, encode: 'base64' | 'hex'): boolean {
  const hmac = crypto.createHmac('sha256', secret)
  const bodySignature = hmac.update(body).digest(encode)

  const signatureBuffer = Buffer.from(signature, encode)
  const bodySignatureBuffer = Buffer.from(bodySignature, encode)
  if (signatureBuffer.length !== bodySignatureBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(signatureBuffer as unknown as NodeJS.ArrayBufferView, bodySignatureBuffer as unknown as NodeJS.ArrayBufferView)
}

export { isSignatureValid, getSignatureString }