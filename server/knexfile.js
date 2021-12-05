// Update with your config settings.
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db_dev.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db_test.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },
};
