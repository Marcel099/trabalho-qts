import crypto from 'crypto'

export function generateUniqueId() {
  return crypto.randomBytes(4).toString('hex')
}