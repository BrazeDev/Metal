import {Knex} from "knex";
import logger from '../../lib/logger'


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('mods', (table) => {
    table.increments()
    table.string('name').notNullable()
    table.string('slug').notNullable()
    table.string('version').notNullable()
    table.string('author')
    table.string('curselink')
    table.string('mcver').notNullable()
    table.timestamp('created').defaultTo(knex.fn.now())
    table.timestamp('updated').defaultTo(knex.fn.now())
    table.boolean('active').defaultTo(true)
    logger.notice('Created table `mods`')
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('mods');
}
