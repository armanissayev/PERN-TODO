const Pool = require("pg").Pool;

const pool = new Pool({
    user: "totslxip",
    password: "5g7etFs5IRVWysPQqpSy0DK2v8PB6fMb",
    host: "rain.db.elephantsql.com",
    port: 5432,
    database: "totslxip"
});

module.exports = pool;