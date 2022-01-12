import { Request, Response, NextFunction } from 'express'

const requireUser = (q: Request, s: Response, n: NextFunction): void | Response<any, Record<string, any>> => {
  const user = s.locals.user
  if (user == undefined) return s.sendStatus(403)
  return n()
}

export default requireUser
