import bcrypt from 'bcrypt'
import {knex, Knex} from 'knex'
import config_c, {Config} from '../lib/config'


export interface User {
  id: number
  username: string
  mailaddr: string
  passhash: string
  xtrasalt: string
  created: number
  updated: number
  active: boolean
  verified: boolean
  admin: boolean
}

export default class database {

  static connect(): Promise<Knex> {
    return new Promise(async (resolve, reject) => {
      try {
        let db = await knex({
          client: 'mysql2',
          connection: (await config_c.fetchConfig()).database
        })
        resolve(db)
      } catch (e) {
        reject(e)
      }
    })
  }

  static testConnection(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      database.connect().then((db) => {
        db.raw('select 1+1 as result').then(() => {
          resolve(true)
        }).catch((e) => {
          reject(e)
        })
      }).catch((e) => {
        reject(e)
      })
    })
  }

  private static resetExistingAdmin(newpass: string, db: Knex): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      bcrypt.genSalt(10, (e, salt) => {
        if (e) reject(e)
        bcrypt.hash(newpass, salt, (e, hash) => {
          if (e) reject(e)
          db('users').where('username', 'admin').update({
            passhash: hash,
            xtrasalt: salt,
            active: true,
            admin: true
          }).then(() => resolve(true)).catch(e => reject(e))
        })
      })
    })
  }

  private static createNewAdmin(newpass: string, db: Knex): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      bcrypt.genSalt(10, (e, salt) => {
        if (e) reject(e)
        bcrypt.hash(newpass, salt, (e, hash) => {
          if (e) reject(e)
          db('users').insert({
            username: 'admin',
            mailaddr: 'admin@example.com',
            passhash: hash,
            xtrasalt: salt,
            active: true,
            verified: false,
            admin: true
          }).then(() => resolve(true)).catch(e => reject(e))
        })
      })
    })
  }

  static resetAdminPassword(config: Config): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      database.connect().then((db) => {
        db('users').select('id').where('username', 'admin').then((rows) => {
          if (!rows.length) {
            this.createNewAdmin(config.adminPassword, db).then(() => resolve(true)).catch(e => reject(e))
          } else {
            this.resetExistingAdmin(config.adminPassword, db).then(() => resolve(false)).catch(e => reject(e))
          }
        })
      }).catch(e => {
        reject(e)
      })
    })
  }

}
