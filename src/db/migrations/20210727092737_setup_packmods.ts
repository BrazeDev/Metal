import { Knex } from "knex";
import logger from '../../lib/logger'


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('packmods', (table) => {
    table.increments()
    table.integer('pack_id').notNullable().unsigned()
    table.foreign('pack_id').references('packs.id')
    table.integer('mod_id').notNullable().unsigned()
    table.foreign('mod_id').references('mods.id')
    logger.notice('Created table `packmods`')
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('packmods');
}

