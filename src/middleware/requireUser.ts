import { Request, Response, NextFunction } from 'express'

import {logMain as log} from '../utils/log'

const requireUser = (q: Request, s: Response, n: NextFunction) => {
    const user = s.locals.user
    if (!user) return s.sendStatus(403)
    return n()
}

export default requireUser