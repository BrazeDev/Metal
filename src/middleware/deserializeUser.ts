import { get } from 'lodash'
import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt'
import { reIssueAccessToken } from '../services/session.service'

const deserializeUser = async (q: Request, s: Response, n: NextFunction): Promise<NextFunction | void> => {
  const accessToken: string = get(q, 'headers.authorization', '').replace(/^Bearer\s/, '')
  const refreshToken: string = get(q, 'headers.x-refresh')
  if (accessToken === undefined) return n()
  const { decoded, expired } = verifyJwt(accessToken, 'accessTokenPublicKey')
  if (decoded !== undefined) {
    s.locals.user = decoded
    return n()
  }
  if ((expired !== undefined) && (refreshToken !== undefined)) {
    const newAccessToken = await reIssueAccessToken({ refreshToken })
    if (newAccessToken !== false) s.setHeader('x-access-token', newAccessToken)
    const result = verifyJwt(newAccessToken as string, 'accessTokenPublicKey')
    s.locals.user = result.decoded
    return n()
  }
  return n()
}

export default deserializeUser
