import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'
import { logMain as log } from '../utils/log'

export interface CreateModInput {
    slug: string
    name: string
    author: string
    imageurl: string
    weburl: string
}

export interface ModDocument extends CreateModInput, mongoose.Document {
    createdAt: Date
    updatedAt: Date
} 

export interface CreateModVersionInput {
    slug: ModDocument['slug']
    version: string
    filename: string
    md5: string
    enabled: boolean
}

export interface ModVersionDocument extends CreateModVersionInput, mongoose.Document {
    createdAt: Date
    updatedAt: Date
} 

const modSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    author: { type: String },
    image: { type: String },
    weburl: { type: String }
}, {
    timestamps: true
})

const ModModel = mongoose.model<ModDocument>('Mod', modSchema)

const modVersionSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: false },
    version: { type: String, required: true, unique: true },
    filename: { type: String },
    md5: { type: String },
    enabled: { type: Boolean }
}, {
    timestamps: true
})

const ModVersionModel = mongoose.model<ModVersionDocument>('ModVersion', modVersionSchema)

export { ModModel, ModVersionModel }