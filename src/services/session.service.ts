import { get } from 'lodash'
import config from 'config'
import { FilterQuery, UpdateQuery } from 'mongoose'
import SessionModel, { SessionDocument } from '../models/session.model'
import { verifyJwt, signJwt } from '../utils/jwt'
import { findUser } from './user.service'

export async function createSession (userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent })
  return session.toJSON()
}

export async function findSessions (query: FilterQuery<SessionDocument>) {
  return await SessionModel.find(query).lean()
}

export async function updateSession (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return await SessionModel.updateOne(query, update)
}

export async function reIssueAccessToken ({ refreshToken }: { refreshToken: string }) {
  const { decoded } = verifyJwt(refreshToken, 'refreshTokenPublicKey')
  if ((decoded == undefined) || (get(decoded, 'session') == undefined)) return false
  const session = await SessionModel.findById(get(decoded, 'session'))
  if ((session == null) || !session.valid) return false
  const user = await findUser({ _id: session.user })
  if (user == null) return false
  const accessToken = signJwt({ ...user, session: session._id },
    'accessTokenPrivateKey',
    { expiresIn: config.get('accessTokenTTL') })
  return accessToken
}
