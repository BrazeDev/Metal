import {Knex, knex} from 'knex'
import {initialize, Config} from './config'



export interface user {
  id: number
  username: string
  mailaddr: string
  passhash: string
  isadmin: boolean
  isactive: boolean
}

export interface mod {
  id: number
  slug: string
  name: string
  version: string
  mcver: string
}

export interface pack {
  id: number
  slug: string
  name: string
  version: string
  mcver: string
}

export default class database {

  
 
  public static INSTANCE: database

  private config: Config
  
  constructor(config: Config) {
    database.INSTANCE = this
    this.config = config
    
  }

  connect(): Promise<object> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.client.connect()
        resolve(this.client)
      } catch (e) {
        reject(e)
      }
    })
  }

}
