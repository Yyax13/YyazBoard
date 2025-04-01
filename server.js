require('dotenv').config(); //puxa dados do arquivo .env
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const pool = require('./db');
const { isNumberObject } = require('util/types');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3001;

// Funções

function clearHTML(BadString) {
    return sanitizeHtml(BadString, {
        allowedTags: [],
        allowedAttributes: {}
    });
}

// Pags estaticas

app.get('/', (req, res) => {
    res.send("Página em desenvolvimento, se preferir você pode enviar uma request GET em /api/consulta/SEUIDAQUI se você não possuir um id, teste com o ID 1");
});

// Stand On

app.get('/StandOn', (req, res) => {
    res.status(201).json({ Status: 'ON', Mensagem: 'COD 200'})
})

// APIs

app.get('/database/admin/criar/tabela', async (req, res) => {
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
          res.status(201).send("Tabela criada com sucesso")
        } catch(err) {
          console.error('Erro ao criar tabela:', err);
          res.status(500).send("Erro ao criar tabela, consulte o console para mais informações")
        } finally {
          await pool.end();
        }
      })();
})

app.get('/api/consulta/:id', async (req,res) => {
    const uid = Numer(req.params.id);
    
    if (isNumberObject(uid)){
        (async () => {
            try {
                const { rows } = await pool.query(
                    'SELECT ID, UserName FROM usuarios WHERE ID = $1',
                    [uid]
                );
                res.status(201).json({ dados: rows[0] });
            } catch(err) {
                console.error("Ocorreu um erro durante a consulta: ", err)
                res.status(500).json({ mensagem: 'Ocorreu um erro durante a consulta, verifique o console.', erro: err })
            }
        })();} else {
            res.status(201).json({ mensagem: "Para a consulta ocorrer, o id deve ser um número inteiro diferente de 0"})
        }
});

app.get('/api/cadastro', async (req, res) => {
    const { uname, upass } = req.query;
    const username = clearHTML(uname);
    const userpassword = clearHTML(upass)

    try {
        const { rows } = await pool.query(
            'INSERT INTO usuarios (UserName, UserPass) VALUES ($1, $2) RETURNING ID',
            [username, userpassword]
        );
        res.status(201).json({ id: rows[0].id });
    } catch (err) {
        console.log(err);
        res.status(500).json({ mensagem: 'Ocorreu um erro durante o cadastro, consulte o console de desenvolvedor.', erro: err })
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});