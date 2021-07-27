module.exports = {
  /**
   * This is the port that the server will listen on
   */
  "port": 8000,

  /**
   * Enabling the `debug` option will enable debug messages on
   * the console, but will also disable some checks that are
   * important for a production environment
   * Leave this disabled unless you're in a dev environment
   */
  "debug": true,

  /**
   * The JWT secret is used to generate tokens when users log
   * in. Keep it secret, or a malicious actor could impersonate
   * any user
   */
  "jwtSecret": "XwD48UY5ymQJuMP_This_is_an_example_key_do_not_use_NZJhKLJrUDa5S8W",

  /**
   * Setting this to true will reset the admin password to the
   * value of "adminPassword" on the next server restart
   */
  "resetAdminPass": true,
  "adminPassword": "Changeme123!",

  /**
   * This can be used to disable user self-registration
   */
  "enableRegistration": false,

  /**
   * This will attempt to block users signing up with email
   * addresses from temporary burner email providers
   */
  "blockBurnerDomains": false,

  /**
   * This will perform a lookup to ensure that the email entered
   * belongs to a domain with mail support
   */
  "performMXLookup": false,

  /**
   * The naming scheme for zip files (more info to come)
   */
  "zipNaming": "((filename)).((datehr))",

  /**
   * The knex mysql2 client connection data
   * https://knexjs.org/
   */
  "database": {
    "host": "mysql",
    "user": "braze",
    "password": "Dontusethispassword",
    "database": "braze"
  }
}
