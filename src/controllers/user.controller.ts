import { Request, Response } from 'express'
import { CreateUserInput } from '../schemas/user.schema'
import { createUser, findUser } from '../services/user.service'
import { logMain as log } from '../utils/log'
import { omit } from 'lodash'

export const createUserHandler = async (q: Request<{}, {}, CreateUserInput['body']>, s: Response) => {
    try {
        const user = await createUser(q.body)
        return s.send(user)
    } catch (e: any) {
        log.error(e)
        return s.status(400).send(e.message)
    }
}

export async function whoamiHandler(q: Request, s: Response) {
    const userId = s.locals.user._id
    const user = await findUser({ _id: userId })
    if (!user) return s.sendStatus(403)
    return s.json(omit(user, 'password' , '_id', '__v' ))
}