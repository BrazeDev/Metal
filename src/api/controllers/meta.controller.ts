import {NextFunction, Request, Response} from 'express'

export default class meta {

  static solderVersion = async (q: Request, s: Response, n: NextFunction) => {
    return await s.json({
      api: 'Braze',
      version: '123',
      stream: 'DEV'
    })
  }

  static brazeVersion = async (q: Request, s: Response, n: NextFunction) => {
    return await s.json({
      api: 'Braze',
      greeting: 'Thank you for choosing Braze!',
      version: '1.0.3',
      stream: 'DEV'
    })
  }

}
