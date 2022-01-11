import { get } from 'lodash'
import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt'
import { reIssueAccessToken } from '../services/session.service'

const deserializeUser = async (q: Request, s: Response, n: NextFunction) => {
    const accessToken = get(q, 'headers.authorization', '').replace(/^Bearer\s/, '')
    const refreshToken = get(q, 'headers.x-refresh')
    if (!accessToken) return n()
    const { decoded, expired } = verifyJwt(accessToken, 'accessTokenPublicKey')
    if (decoded) {
        s.locals.user = decoded
        return n()
    }
    if (expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({ refreshToken })
        if (newAccessToken) s.setHeader('x-access-token', newAccessToken)
        const result = verifyJwt(newAccessToken as string, 'accessTokenPublicKey')
        s.locals.user = result.decoded
        return n()
    }
    return n()
}

export default deserializeUser