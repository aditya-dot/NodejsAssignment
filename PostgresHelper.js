const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:123@localhost:5432/postgres'
let client
// const pool = new Pool({
//     connectionString: connectionString,
// })
// pool = new Pool({
//     host: 'localhost',
//     user: 'postgres',
//     database: 'test',
//     password: '123',
//     port: 5432,
// })
// pool.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     pool.end()
// })
function PostgresHelper() {
    try {
        client = new Client({
            host: 'localhost',
            user: 'postgres',
            database: 'test',
            password: '123',
            port: 5432,
        })
        client.connect(function (err) {
            if (err) {
                console.log("Connect Error");

            }
        })

    } catch (e) {
        console.log("PostgresHelper", e);
    }
}

PostgresHelper.prototype.ExecuteQuery = function (sSQLQuery, callback) {

    client.query(sSQLQuery, (err, res) => {
        if (!err) {
            //console.log(err, res)
            // pool.end()
            callback('true', res)
            client.end()
        } else {
            callback('DBerror', err)
        }

    })
}


module.exports = PostgresHelper



















// let pg = require('pg');
// //module.exports = PostgresHelper;
// let pool


// pool = new pg.Pool({
//     host: 'localhost',
//     user: 'postgres',
//     database: 'postgres',
//     password: '123',
//     port: 5432,
// })


// pool.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     pool.end()
// })