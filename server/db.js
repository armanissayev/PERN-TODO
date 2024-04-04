const Pool = require("pg").Pool;

const pool = new Pool({
    user: "armashka",
    password: "5susjpG3g9pZE7optqucqK82VpJhI1zI",
    host: "dpg-co6istcf7o1s73dk8fvg-a.frankfurt-postgres.render.com",
    port: 5432,
    database: "pern_todo_l6z8",
    ssl: true
});

module.exports = pool;