require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.PGSQL_HOST,
    port: process.env.PG_PORT,
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASS,
    database: process.env.PGSQL_DB_USERS,
    max: 10,
    connectionTimeoutMillis: 10000,
    allowExitOnIdle: true,
    idleTimeoutMillis: 30000
});

async function testConnection() {
    let client;
    try {
        client = await pool.connect();
        console.log('CONEXÃO BEM SUCEDIDA');
        
    } catch(err) {
        console.error("CONEXÃO MAL SUCEDIDA", err.stack || err);
        console.log(err.code)
    } finally {
        if (client) client.release();
    }
}

testConnection()

module.exports= pool;