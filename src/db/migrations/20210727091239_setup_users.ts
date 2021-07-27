import {Knex} from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('username').notNullable().unique()
    table.string('mailaddr').notNullable().unique()
    table.string('passhash').notNullable()
    table.string('xtrasalt').notNullable()
    table.timestamp('created').defaultTo(knex.fn.now())
    table.timestamp('updated').defaultTo(knex.fn.now())
    table.boolean('active').defaultTo(true)
    table.boolean('verified').defaultTo(false)
    table.boolean('admin').defaultTo(false)
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}

