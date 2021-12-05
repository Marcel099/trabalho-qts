// Update with your config settings.
import { Knex } from 'knex'

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './src/database/db_sqlite.sqlite'
  },
  migrations: {
    directory: './src/database/migrations'
  },
  useNullAsDefault: true,     // SQLite não suporta valores default
};

export default config;
