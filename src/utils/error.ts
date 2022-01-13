import { Request, Response } from 'express'
import { logApi as log } from './log'

type ErrorDefinition = string
let ErrorDefinition: { [ index: string ]: { http: number, message: string } } = {
  M50000: { http: 500, message: 'Unknown error', },
  M50001: { http: 401, message: 'Authentication required', },
  M50002: { http: 403, message: 'Endpoint forbidden for this user', },
  M50003: { http: 404, message: 'Referenced resource does not exist', },
  M50004: { http: 503, message: 'Unknown error accessing database', },
  M50100: { http: 500, message: 'Unknown error in `User` module', },
  M50101: { http: 409, message: 'Email address already registered', },
  M50102: { http: 409, message: 'Username already registered', },
  M50103: { http: 400, message: 'Email address is required', },
  M50104: { http: 400, message: 'Username is required', },
  M50105: { http: 400, message: 'Password is required', },
  M50106: { http: 400, message: 'Password confirmation is required', },
  M50107: { http: 400, message: 'Password must be at least 8 characters', },
  M50108: { http: 400, message: 'Password must match confirmation', },
  M50109: { http: 401, message: 'Session invalid', },
  M50199: { http: 418, message: 'Seriously?! SQL Injection?! Get outta here!', }, // /[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi
  M50200: { http: 500, message: 'Unknown error in `Session` module', },
  M50201: { http: 401, message: 'Invalid username/password', },
  M50202: { http: 401, message: 'Invalid TOTP', },
  M50203: { http: 401, message: 'oAuth failed: ', },
  M50204: { http: 400, message: '', },
  M50205: { http: 400, message: '', },
  M50206: { http: 400, message: '', },
  M50207: { http: 400, message: '', },
  M50208: { http: 400, message: '', },
  M50300: { http: 500, message: 'Unknown error in `Mod` module', },
  M50400: { http: 500, message: 'Unknown error in `Pack` module', },
  M50500: { http: 500, message: 'Unknown error in `Magic` module' },
}

const error = (q: Request, s: Response, code: string): Response<any, Record<string, any>> => {
  log.error(`${q.requestId} - ${q.method} ${q.path} - ${code}: ${ErrorDefinition[code]}`)
  return s.status(ErrorDefinition[code].http).json({
    code,
    message: ErrorDefinition[code].message
  })
}

export default error
