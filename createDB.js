require('dotenv').config();
const pool = require('./db');

(async () => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS usuarios (
          ID SERIAL PRIMARY KEY,
          UserName VARCHAR(125) NOT NULL,
          UserPass VARCHAR(255) NOT NULL
        )
      `);
      console.log('Tabela criada com sucesso');
    } catch(err) {
      console.error('Erro ao criar tabela:', err);
    } finally {
      await pool.end();
    }
  })();