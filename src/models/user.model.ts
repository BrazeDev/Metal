import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'
import { logMain as log } from '../utils/log'

export interface UserInput {
    username: string
    mailaddr: string
    password: string
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date
    updatedAt: Date
    comparePassword(candidate: string): Promise<Boolean>
}

const userSchema = new mongoose.Schema({
    mailaddr: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    permissions: { type: Number, required: false }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    const user = this as UserDocument;
    if (!user.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(config.get<number>('saltRounds'))
    const hash = await bcrypt.hashSync(user.password, salt)
    user.password = hash
    return next()
})

userSchema.methods.comparePassword = async function (candidate: string): Promise<Boolean> {
    const user = this as UserDocument;
    return bcrypt.compare(candidate, user.password).catch((e) => false)
}

const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel