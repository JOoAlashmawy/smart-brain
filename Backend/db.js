const Pool = require("pg").Pool;

const db = new Pool({
  user: "postgres",
  password: "12345678y",
  host: "localhost",
  port: 5432,
  database: "smart-brain"
});

module.exports = db;


// const pgp = require('pg-promise')(/* initialization options */);

// const cn = {
//     host: 'localhost', // server name or IP address;
//     port: 5432,
//     database: 'myDatabase',
//     user: 'myUser',
//     password: 'myPassword'
// };

// alternative:
// var cn = 'postgres://username:password@host:port/database';

// const db = pgp(cn); // database instance;
