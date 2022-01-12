import mongoose from 'mongoose'
import { MockMongoose } from 'mock-mongoose'
import config from 'config'
import { logMain as log } from './log'

const db: any = {}

db.connect = async () => {
  const uri = config.get<string>('dbConnection')
  try {
    await mongoose.connect(uri)
    log.info(`Connected to mongoDB instance at ${uri.split('/')[2]}`)
  } catch (e: any) {
    log.fatal('Failed to connect to db, check your connection string')
    process.exit(1)
  }
}

export default db
