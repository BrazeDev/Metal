import { Request, Response, NextFunction } from 'express'
import error from '../utils/error'

const requireUser = (q: Request, s: Response, n: NextFunction): void | Response<any, Record<string, any>> => {
  const user = s.locals.user
  if (user === undefined) return error(q, s, 'M50001')
  return n()
}

export default requireUser
