import logger from './logger'
import isDocker from 'is-docker'
import database from '../db/database'
import {up as up_users} from '../db/migrations/20210727091239_setup_users'
import {up as up_mods} from '../db/migrations/20210727091904_setup_mods'
import {up as up_packs} from '../db/migrations/20210727091915_setup_packs'
import {up as up_pmods} from '../db/migrations/20210727092737_setup_packmods'
import { findSeries } from 'async'
import fsp from 'fs/promises'
import fs from 'fs'

const args = require('minimist')(process.argv.slice(2))

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

export default class config {

  private configpath: string 

  constructor() {
    if (typeof process.env.CONFIG_PATH !== 'undefined') {
      this.configpath = process.env.CONFIG_PATH
    } else if (typeof args.config !== 'undefined') {
      this.configpath = args.config
    } else {
      if (isDocker()) {
        logger.info(`Running in docker mode! Setting default config path - set the env var 'DISABLE_DOCKER_DETECTION' to disable this feature.`)
        this.configpath = '/metal/metal.config.js'
      } else {
        logger.info(`Running in standalone mode! Disabling docker enhancements. Set env var 'DISABLE_DOCKER_DETECTION' to disable this feature.`)
        this.configpath = '../../metal.config.js'
      }
    }
  }

  private throwError(exitCode: number, message: string) {
    logger.emerg(message)
    process.exit(exitCode)
  }

  private loadConfig(): Promise<Config> {
    return new Promise((resolve, reject) => {
      try {
        resolve(require(this.configpath))
      } catch (e) {
        this.throwError(1, `Unable to read config. You can specify a custom location with the "CONFIG_PATH" env var, or the "--config" cmd line argument.`)
      }
    })
  }

  private verifyConfig(config: Config): Promise<Config> {
    return new Promise((resolve, reject) => {
      if (config.port < 1 || config.port > 65535) this.throwError(2, `Invalid port - "${config.port}". Check your config.`)
      if (config.jwtSecret === 'XwD48UY5ymQJuMP_This_is_an_example_key_do_not_use_NZJhKLJrUDa5S8W') {
        logger.crit('The JWT secret has not be changed. Keeping the default value creates a serious risk of intrusion.')
        if (!config.debug) process.exit(2)
      }
      if (config.jwtSecret.length < 32) this.throwError(2, `The JWT secret must be at least 32 chars. Keys longer than 256 chars may cause performance issues. Metal will now exit.`)
      database.testConnection(config).then(() => {
        logger.info('Database connection ok!')
        resolve(config)
      }).catch(e => this.throwError(2, `Unable to connect to the database. Check that your connection data is correct in the config file. Metal will now exit.`))
    })
  }

  private initDatabase(config: Config): Promise<Config> {
    return new Promise((resolve, reject) => {
      database.connect(config).then((db) => {
        db.schema.hasTable('users').then(b => { return up_users(db) }).then(() => {
          return db.schema.hasTable('mods').then(b => { return up_mods(db) })
        }).then(() => {
          return db.schema.hasTable('packs').then(b => { return up_packs(db) })
        }).then(() => {
          return db.schema.hasTable('pmods').then(b => { return up_pmods(db) })
        }).then(() => {
          resolve(config)
        })
      })
    })
  }

  private checkDirectories(config: Config): Promise<Config> {
    let work = '/metal/work'
    let repo = '/metal/repo'
    return new Promise((resolve, reject) => {
      Promise.all([
        fsp.access(work).catch(e => {
          logger.info(`Creating work directory at '${work}'`)
          return fsp.mkdir(work)}
        ),
        fsp.access(repo).catch(e => {
          logger.info(`Creating repo directory at '${repo}'`)
          return fsp.mkdir(repo)}
        )
      ]).then(() => resolve(config))
    })
  }

  private resetAdminPassword(config: Config): Promise<Config> {
    return new Promise((resolve, reject) => {
      if (config.resetAdminPass) {
        logger.warn(`'resetAdminPass' is set to true. The admin password will be reset.`)
        database.resetAdminPassword(config).then(() => {
          logger.info(`Admin password has been reset`)
          resolve(config)
        })
      }
    })
  }

  public init(): Promise<Config> {
    return this.loadConfig().then((config) => {
      return this.verifyConfig(config)
    }).then((config) => {
      return this.initDatabase(config)
    }).then((config) => {
      return this.checkDirectories(config)
    }).then((config) => {
      return this.resetAdminPassword(config)
    })
  }

}