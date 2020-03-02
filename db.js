const Pool = require('pg').Pool

const dbAuth = {
  user: 'expressbackend',
  host: 'localhost',
  database: 'expressbackend',
  password: 'admin2020',
  port: 5432,
};

const pool = new Pool(dbAuth);

module.exports = {
	query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}