require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB_USERS,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000
});

async function testConnection() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log('CONEXÃO BEM SUCEDIDA');

        const [dbs] = await conn.query('SHOW DATABASES');
        console.log('DBs disponiveis: ', dbs.map(d => d.Database));

    } catch(err) {
        console.error("CONEXÃO MAL SUCEDIDA", err.stack || err);
        console.log(err.code)
    } finally {
        if (conn) conn.release();
    }
}

testConnection()

module.exports= pool;