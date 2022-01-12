import jwt, { JwtPayload } from 'jsonwebtoken'
import config from 'config'
// import { logMain as log } from './log'

export function signJwt (
  object: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions | undefined
): string {
  const signingKey = config.get<string>(keyName)
  return jwt.sign(object, signingKey, { ...((options != null) && options), algorithm: 'RS256' })
}

export function verifyJwt (
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): { valid: boolean, expired: boolean, decoded: string | JwtPayload | null } {
  const publicKey = config.get<string>(keyName)
  try {
    const decoded = jwt.verify(token, publicKey)
    return { valid: true, expired: false, decoded }
  } catch (e: any) {
    // if (typeof e !== typeof TokenExpiredError || process.env.NODE_ENV !== 'test') log.error(e)
    return { valid: false, expired: e.message === 'jwt expired', decoded: null }
  }
}
