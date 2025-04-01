require('dotenv').config()
const pool = require('./db')

function GetPass(UName) {
    (async () => {
        try {
            const [ rows ] = pool.query(
                'SELECT ID, UserName, UserPass FROM usuarios WHERE UserName = $1',
                [UName]
            );
            console.log(rows[0].UserName);
            console.log(rows[0].UserPass);
            const [DataCatched] = [rows[0].UserName, rows[0].UserPass, rows[0].ID];
            return DataCatched
        } catch(err) {
            console.error('ERRO: ', err);
        };
    });
};

function Validate(UserInput, DataFromDB) {
    if (UserInput) {
        const UserFromDB = DataFromDB[0].UserName;
        const PassFromDB = DataFromDB[0].UserPass;

        if (UserInput[0].Pass = PassFromDB) {
            const [AuthOutput] = [Authenticated = true, id = DataFromDB[0].ID];
            console.log('Sucesso, login efetuado!')
            return AuthOutput
        } else {
            const [AuthOutput] = [Authenticated = false, id = null];
            console.log('Tentativa de login invalida!')
            return AuthOutput
        };
    };
};

/*
User Site Input needs to be:
[
    'UName': 'Username here',
    'UPass': 'User password here'
]
*/

const MainFunc = function Main(UserSiteInput) {
    const SiteUName = UserSiteInput[0];
    const SiteUPass = UserSiteInput[1];
    const DBData = GetPass(SiteUName);
    const Auth = Validate(UserSiteInput, DBData);
    return Auth
};

module.exports= MainFunc;
