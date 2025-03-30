require('dotenv').config(); //puxa dados do arquivo .env
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const path = require('path');
const sanitizeHtml = require('sanitize-html');

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
    res.send("Página em desenvolvimento, se preferir você pode enviar uma request GET em /api/consulta com os parametros query username e userid");
});

// Stand On

app.get('/StandOn', (req, res) => {
    res.status(200);
    res.send('Site Ativo');
})

// APIs

app.get('/api/consulta', (req, res) => {
    const { username, userid } = req.query;
    res.send(`Olá ${clearHTML(username)}! O seu id é: ${clearHTML(userid)}`);
});

app.get('/api/consulta/:id', (req,res) => {
    const uid = req.params.id;
    res.send(`O seu id é ${uid}`);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});