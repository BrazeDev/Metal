/* If you're looking for the config options, check braze.config.js in /braze
   inside this container. This file contains code for management and loading
   of the config file and the options inside it - do *NOT* edit this unless you
   know what you're doing. To change the location where the config file will be
   searched for, you can provide the environment variable `CONFIG_PATH` or run
   the app with the `--config=/path/to/config` argument */
import fs from 'fs'
import minimist from 'minimist'
import database from '../db/database'
import {up as up_users} from '../db/migrations/20210727091239_setup_users'
import {up as up_mods} from '../db/migrations/20210727091904_setup_mods'
import {up as up_packs} from '../db/migrations/20210727091915_setup_packs'
import {up as up_pmods} from '../db/migrations/20210727092737_setup_packmods'
import logger from './logger'

const args = minimist(process.argv.slice(2))

export interface Config {
  bind: string
  port: number
  debug: boolean
  jwtSecret: string
  resetAdminPass: boolean
  adminPassword: string
  enableRegistration: boolean
  blockBurnerDomains: boolean
  performMXLookup: boolean
  folders: {
    work: string
    repo: string
  }
  cacheZipFiles: {
    magic: boolean
    solder: boolean
    braze: boolean
  }
  zipNaming: string
  database: {
    host: string
    user: string
    password: string
    database: string
  }
}

export var configFile: Config
let configPath = ''
let metadata = {}

const loadConfiguration: Promise<Config> = new Promise((resolve, reject) => {
  if (typeof process.env.CONFIG_PATH !== 'undefined') {
    configPath = process.env.CONFIG_PATH
  } else if (typeof args.config !== 'undefined') {
    configPath = args.config
  } else {
    configPath = '/braze/braze.config.js'
  }
  try {
    configFile = require(configPath)
  } catch (e) {
    reject(`Unable to read config. You can specify a custom location with the "CONFIG_PATH" env var, or the "--config" cmd line argument.`)
  }
  try {
    metadata = require('../../braze.meta.json')
  } catch (e) {
    reject(`Failed to find "braze.meta.json". Please re-clone the repo or re-download Braze. Error: ${e}`)
  }
  resolve(configFile)
})

const verifyConfiguration: Promise<Config> = new Promise((resolve, reject) => {
  /*if (!(configFile.bind.match(/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/) ||
    configFile.bind.match(/((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])/))) {
    reject(`Malformed bind address, must be a valid IPv4 or IPv6 address. Got "${configFile.bind}"`)
  }*/
  if (!(configFile.port >= 1 && configFile.port <= 65535)) {
    reject(`Malformed port - must be between 1 and 65535. Got "${configFile.port}"`)
  }
  if (configFile.jwtSecret === 'XwD48UY5ymQJuMP_This_is_an_example_key_do_not_use_NZJhKLJrUDa5S8W') {
    if (configFile.debug) {
      logger.crit('The JWT secret has not be changed. Keeping the default value creates a serious risk of intrusion.')
    } else {
      reject('The JWT secret has not be changed. Keeping the default value creates a serious risk of intrusion. Braze will now exit.')
    }
  }
  if (configFile.jwtSecret.toString().length < 32) {
    reject('The JWT secret must be at least 32 chars. Keys longer than 256 chars may cause performance issues. Braze will now exit.')
  }
  database.testConnection().then(() => {
    logger.info('Database connection ok!')
  }).catch((e) => {

    reject('Unable to connect to the database. Check that your connection data is correct in the config file. Braze will now exit.')
  })
  resolve(configFile)
})

const initEnvironment: Promise<Config> = new Promise((resolve, reject) => {
  process.env.NODE_ENV = configFile.debug ? 'debug' : 'production'

  database.connect().then((db) => {
    db.schema.hasTable('users').then((b) => {
      if (!b) {
        up_users(db).then(() => {logger.notice('Created table `users`')})
          .catch(e => reject(e))
      }
    })
    db.schema.hasTable('mods').then((b) => {
      if (!b) {
        up_mods(db).then(() => {logger.notice('Created table `mods`')})
          .catch(e => reject(e))
      }
    })
    db.schema.hasTable('packs').then((b) => {
      if (!b) {
        up_packs(db).then(() => {logger.notice('Created table `packs`')})
          .catch(e => reject(e))
      }
    })
    db.schema.hasTable('packmods').then((b) => {
      if (!b) {
        up_pmods(db).then(() => {logger.notice('Created table `packmods`')})
          .catch(e => reject(e))
      }
    })
  })
  resolve(configFile)
})

const initDirectories: Promise<Config> = new Promise((resolve, reject) => {
  let work = '/braze/work'
  if (!fs.existsSync(work)) {
    logger.info(`Creating work directory at: ${work}`)
    fs.mkdirSync(work)
  }
  try {
    fs.accessSync(work, fs.constants.W_OK)
  } catch (e) {
    reject(`Work directory "${work}" is not writable`)
  }
  let repo = '/braze/repo'
  if (!fs.existsSync(repo)) {
    logger.info(`Creating repo directory at: ${repo}`)
    fs.mkdirSync(repo)
  }
  try {
    fs.accessSync(repo, fs.constants.W_OK)
  } catch (e) {
    reject(`Repo directory "${repo}" is not writable`)
  }
  resolve(configFile)
})

export const initialize: Promise<Config> = new Promise((resolve, _) => {
  loadConfiguration.then(() => {
    logger.info(`Loaded configuration from ${configPath}`)
    verifyConfiguration.then(() => {
      logger.info(`Verified configuration file`)
      initEnvironment.then(() => {
        initDirectories.then((config) => {
          logger.info(`Configuration file accepted`)
          resolve(config)
        }, e => {
          logger.emerg(e)
          process.exit(4)
        })
      }, e => {
        logger.emerg(e)
        process.exit(3)
      })
    }, e => {
      logger.emerg(e)
      process.exit(2)
    })
  }, e => {
    logger.emerg(e)
    process.exit(1)
  })
})
