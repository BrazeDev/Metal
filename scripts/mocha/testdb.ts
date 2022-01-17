import mongoose from 'mongoose'
//import { MockMongoose } from 'mock-mongoose'
import { logMain as log } from '../../src/utils/log'

//const mockMongoose = new MockMongoose(mongoose)

/*
before(async () => {
  log.warn('Running in test mode - DB changes won\'t be saved')
  await mockMongoose.prepareStorage()
})

beforeEach(async () => {
  await mockMongoose.helper.reset()
})

after(async () => {
  mockMongoose.mongodHelper.stop()
})*/

log.warn('Running in test mode - DB changes won\'t be saved')
