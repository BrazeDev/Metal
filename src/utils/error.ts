import { Request, Response } from 'express'

type ErrorDefinition = string
let ErrorDefinition = {
  M50000: 'Unknown error',
  M50001: 'Authentication required',
  M50002: 'Endpoint forbidden for this user',
  M50100: 'Unknown error in `User` module',
  M50101: 'Email address already registered',
  M50102: 'Username already registered',
  M50103: 'Email address is required',
  M50104: 'Username is required',
  M50105: 'Password is required',
  M50106: 'Password confirmation is required',
  M50107: 'Password must be at least 8 characters',
  M50108: 'Password must match confirmation',
  M50109: 'Seriously?! SQL Injection?! Get outta here!', // /[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi
  M50200: 'Unknown error in `Session` module',
  M50201: 'Invalid username/password',
  M50202: '',
  M50203: '',
  M50204: '',
  M50205: '',
  M50206: '',
  M50207: '',
  M50208: '',
  M50300: 'Unknown error in `Mod` module',
  M50400: 'Unknown error in `Pack` module',
  M50500: 'Unknown error in `Magic` module'
}

const error = (q: Request, s: Response, code: string) => {
  return {
    code,
    message: ErrorDefinition[code] as string
  }
}



export default error