
require('dotenv').config();
const knex = require('knex');

// Knex configuration object
const knexConfig = {
  client: 'pg', // Specifies that we are using PostgreSQL
  connection: process.env.DATABASE_URL, // Uses the connection string from our .env file
  searchPath: ['public'], // Defines the default schema to use
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

// Initialize knex with the configuration
const db = knex(knexConfig);

// Verify the connection by trying to get the current date from the database
db.raw('SELECT NOW()')
  .then(() => {
    console.log('PostgreSQL connected successfully.');
  })
  .catch((e) => {
    console.error('Failed to connect to PostgreSQL.');
    console.error(e);
    process.exit(1); // Exit the process if the DB connection fails
  });

module.exports = db;
