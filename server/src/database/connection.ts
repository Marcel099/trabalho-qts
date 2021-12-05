import knex from 'knex';
import configs from '../../knexfile'

const config = process.env.NODE_ENV === 'test'
  ? configs.test : configs.development

export const connection = knex(config)
