import { Request, Response, NextFunction } from 'express'
import { AnyZodObject } from 'zod'

const validate = (schema: AnyZodObject) => (q: Request, s: Response, n: NextFunction) => {
  try {
    schema.parse({
      body: q.body,
      query: q.query,
      params: q.params
    })
    n()
  } catch (e: any) {
    return s.status(400).send(e.errors)
  }
}

export default validate
