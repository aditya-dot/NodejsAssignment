const { Pool, Client } = require('pg')
let client
/*Postgres DB connection*/
function PostgresHelper() {
    try {
        client = new Client({
            host: 'localhost',
            user: 'postgres',
            database: 'social',
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

/*Qwery function for Postgres*/
PostgresHelper.prototype.ExecuteQuery = function (sSQLQuery, callback) {
    console.log("sSQLQuery===================>", sSQLQuery);
    client.query(sSQLQuery, (err, res) => {
        if (err) {
            callback('DBerror', err)
        } else {
            callback('successful', res)
            // client.end()
        }

    })
}


module.exports = PostgresHelper

















