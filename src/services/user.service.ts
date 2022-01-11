import { FilterQuery } from'mongoose'
import { omit } from 'lodash'
import UserModel, { UserDocument, UserInput } from '../models/user.model'
import { string } from 'zod'

export const createUser = async (input: UserInput) => {
    try {
        const user = await UserModel.create(input)
        return omit(user.toJSON(), 'password')
    } catch (e: any) {
        throw new Error(e)
    }
}

export const validatePassword = async ({ username, password }: { username: string, password: string }) => {
    const user = await UserModel.findOne({ username })
    if (!user) return false
    const isValid = await user.comparePassword(password)
    if (!isValid) return false
    return omit(user.toJSON(), 'password')
}

export const findUser = async (query: FilterQuery<UserDocument>) => {
    return UserModel.findOne(query).lean()
}