require('dotenv').config()
const pool = require('./db')

async function GetPass(UName) {
    (async () => {
        try {
            const [ rows ] = pool.query(
                'SELECT ID, UserName, UserPass FROM usuarios WHERE UserName = $1',
                [UName]
            );
            console.log(rows[0].UserName);
            console.log(rows.UserName);
            if (rows === null) {
                return null
            };
            return {
                UserName: rows[0].UserName,
                UserPass: rows[0].UserPass,
                ID: rows[0].ID
            }

        } catch(err) {
            console.error('ERRO: ', err);
            throw err;
        };
    });
};

function Validate(UserInput, DataFromDB) {
    if (UserInput) {
        const UserFromDB = DataFromDB.UName;
        const PassFromDB = DataFromDB.UPass;

        if (!DataFromDB) {
            console.log('User não encontrado');
            return {Authenticated: false, id: null}
        };

        if (UserInput[0].Pass === PassFromDB) {
            console.log('Sucesso, login efetuado!');
            return {Authenticated: true, id: DataFromDB.ID}
        } else {
            console.log('Tentativa de login invalida!');
            return {Authenticated: false, id: null}
        };
    };
};

async function MainFunc(UserSiteInput) {
    try {
        const DBData = await GetPass(UserSiteInput.UName);
        console.log(DBData);
        return Validate(UserSiteInput, DBData)
    } catch (err) {
        console.error(err);
        return {Authenticated: false, id: null}
    }
};

module.exports= MainFunc;