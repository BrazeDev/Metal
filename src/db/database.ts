import {knex, Knex} from 'knex'


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
          connection: require('../lib/config').configFile.database
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

}
