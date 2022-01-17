import { Request, Response } from 'express'
import { CreateUserInput } from '../schemas/user.schema'
import { createUser, findUser } from '../services/user.service'
import { logMain as log } from '../utils/log'
import { omit } from 'lodash'
import error from '../utils/error'

export const createUserHandler = async (q: Request<{}, {}, CreateUserInput['body']>, s: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const user = await createUser(q.body)
    return s.send(user)
  } catch (e: any) {
    if (e.message.includes('mailaddr:')) return error(q, s, 'M50101')
    if (e.message.includes('username:')) return error(q, s, 'M50102') 
    return error(q, s, 'M50004')
  }
}

export const whoamiHandler = async (q: Request, s: Response): Promise<Response<any, Record<string, any>>> => {
  if (s.locals.user === null) return error(q, s, 'M50001')
  const userId = s.locals.user._id
  const user = await findUser({ _id: userId })
  if (user === null) return error(q, s, 'M50109')
  return s.json(omit(user, 'password', '_id', '__v'))
}
