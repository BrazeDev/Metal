import { FilterQuery, FlattenMaps, LeanDocument } from 'mongoose'
import { omit } from 'lodash'
import UserModel, { UserDocument, UserInput } from '../models/user.model'

export const createUser = async (input: UserInput): Promise<Pick<FlattenMaps<LeanDocument<UserDocument & { _id: any } >>, '_id' | '__v' | 'id' | 'mailaddr' | 'username' | 'createdAt' | 'updatedAt' | 'comparePassword'>> => {
  try {
    const user = await UserModel.create(input)
    return omit(user.toJSON(), 'password')
  } catch (e: any) {
    throw new Error(e)
  }
}

export const validatePassword = async ({ username, password }: { username: string, password: string }): Promise<false | Pick<FlattenMaps<LeanDocument<UserDocument & { _id: any } >>, '_id' | '__v' | 'id' | 'createdAt' | 'updatedAt' | 'comparePassword' | 'username' | 'mailaddr'>> => {
  const user = await UserModel.findOne({ username })
  if (user === null) return false
  const isValid = await user.comparePassword(password)
  if (isValid === false) return false
  return omit(user.toJSON(), 'password')
}

export const findUser = async (query: FilterQuery<UserDocument>): Promise<LeanDocument<UserDocument & { _id: any } > | null> => {
  return await UserModel.findOne(query).lean()
}
