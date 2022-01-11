import { Request, Response } from 'express'
import { CreateUserInput } from '../schemas/user.schema'
import { createUser } from '../services/user.service'
import { logMain as log } from '../utils/log'

export const createUserHandler = async (q: Request<{}, {}, CreateUserInput['body']>, s: Response) => {
    try {
        const user = await createUser(q.body)
        return s.send(user)
    } catch (e: any) {
        log.error(e)
        return s.status(400).send(e.message)
    }
}