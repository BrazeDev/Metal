import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import config from 'config'
import { logMain as log } from './log'

export function signJwt (
  object: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions | undefined
) {
  // const signingKey = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii')
  const signingKey = config.get<string>(keyName)
  return jwt.sign(object, signingKey, { ...((options != null) && options), algorithm: 'RS256' })
}

export function verifyJwt (
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
) {
  // const publicKey = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii')
  const publicKey = config.get<string>(keyName)
  try {
    const decoded = jwt.verify(token, publicKey)
    return { valid: true, expired: false, decoded }
  } catch (e: any) {
    if (typeof e !== typeof TokenExpiredError || process.env.NODE_ENV !== 'test') log.error(e)
    return { valid: false, expired: e.message === 'jwt expired', decoded: null }
  }
}
