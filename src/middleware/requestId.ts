import { Request, Response, NextFunction } from 'express'
import { randomUUID } from 'crypto'

const addId = () => (q: Request, s: Response, n: NextFunction): void | Response<any, Record<string, any>> => {
  q.requestId = randomUUID()
  s.set('x-request-id', q.requestId)
  return n()
}

export default addId