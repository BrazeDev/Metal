import { Request, Response } from 'express'
import config from 'config'
import { createSession, findSessions, updateSession } from '../services/session.service'
import { validatePassword } from '../services/user.service'
import { signJwt } from '../utils/jwt'

export async function createUserSessionHandler(q: Request, s: Response) {
    const user = await validatePassword(q.body)
    if (!user) return s.status(401).send('Invalid username or password')
    const session = await createSession(user._id, q.get('user-agent') || '')
    const accessToken = signJwt({ ...user, session: session._id },
                                'accessTokenPrivateKey',
                                { expiresIn: config.get('accessTokenTTL') })
    const refreshToken = signJwt({ ...user, session: session._id },
                                'refreshTokenPrivateKey',
                                { expiresIn: config.get('refreshTokenTTL') })
    return s.json({ accessToken, refreshToken })
}

export async function getUserSessionsHandler(q: Request, s: Response) {
    const userId = s.locals.user._id
    const sessions = await findSessions({ user: userId, valid: true })
    return s.json(sessions)
}

export async function deleteSessionHandler(q: Request, s: Response) {
    const sessionId = s.locals.user.session
    await updateSession({ _id: sessionId }, { valid: false })
    return s.json({ accessToken: null, refreshToken: null })
}