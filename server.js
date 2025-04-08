require('dotenv').config(); //puxa dados do arquivo .env
const axios = require('axios'); //instala axios para fazer requests
const express = require('express'); //instala express para criar o servidor
const session = require('express-session'); //instala express-session para gerenciar sessões
const cors = require('cors'); //instala cors para permitir requisições de outros domínios
const path = require('path'); //instala path para manipular caminhos de arquivos
const sanitizeHtml = require('sanitize-html'); //instala sanitize-html para limpar entradas de HTML
const pool = require('./db'); //instala pool para gerenciar conexões com o banco de dados
const validatePass = require('./ViewPass'); //instala ViewPass para validar senhas
const { isNumberObject } = require('util/types'); //instala isNumberObject para verificar se um valor é um objeto de número

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3001;

// Cookies

app.use(session({ 
    secret: 'Segredo',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));

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

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
});

app.get('/sucesso', (req, res) => {
    const Acesso = req.query.login;
    
    if (Acesso === 'liberado') {
        res.status(200).sendFile(path.join(__dirname, 'public', 'sucesso.html'));
    } else {
        res.status(404);
    }
});

app.get('/cadastro', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'cadastro.html'))
});

// Stand On

app.get('/StandOn', (req, res) => {
    res.status(200).json({ Status: 'ON', Mensagem: 'COD 200'})
});

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
});

app.get('/api/consulta', async (req,res) => {
    const uid = req.query.id;

        (async () => {
            try {
                const query = ("SELECT ID, UserName FROM usuarios WHERE ID =", uid)
                const { rows } = await pool.query(query);
//                const { rows } = await pool.query(
//                    'SELECT ID, UserName FROM usuarios WHERE ID = $1',
//                    [uid]
//                );
                res.status(201).json({ dados: rows[0] });
            } catch(err) {
                console.error("Ocorreu um erro durante a consulta: ", err)
                res.status(500).json({ mensagem: 'Ocorreu um erro durante a consulta, verifique o console.', erro: err })
            };
        });
});

app.post('/api/cadastro', async (req, res) => {
    const { uname, upass } = req.body;
    const username = clearHTML(uname);
    const userpassword = clearHTML(upass)

    try {
        const { rows } = await pool.query(
            'INSERT INTO usuarios (UserName, UserPass) VALUES ($1, $2) RETURNING ID',
            [username, userpassword]
        );
        res.status(201).json({ id: rows[0].id, UserName: rows[0].UserName, UserPass: rows[0].UserPass });
    } catch (err) {
        console.log(err);
        res.status(500).json({ mensagem: 'Ocorreu um erro durante o cadastro, consulte o console de desenvolvedor.', erro: err })
    }
});

app.post('/api/validar', async (req, res) => {
    try{
        const {user: UName, passwd: UPass} = req.body;

        const AuthResult = await validatePass({UName, UPass});

        if (AuthResult.Authenticated) {
            req.session.userId = AuthResult.id;
            res.status(200).json({ sucess: true, RedirectTo: 'https://yyazboard.onrender.com/cadastro', userId: AuthResult.id});
        } else {
            req.session.destroy();
            console.log('Falha no login, verifique as credenciais')
            res.status(401).json({ sucess: false, RedirectTo: '/', message: 'NoAuth'});
        };
    } catch (err) {
        console.error(err);
        req.session.destroy();
        res.status(500).json({message: 'Falha no servidor', sucess: false, RedirectTo: '/'})
    };
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});