require('dotenv').config()
const pool = require('./db')

function GetPass(UName) {
    (async () => {
        try {
            const [ rows ] = pool.query(
                'SELECT UserName, UserPass FROM usuarios WHERE UserName = $1',
                [UName]
            );
            console.log(rows[0].UserName);
            console.log(rows[0].UserPass);
            return rows
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
            const AuthOutput = "Sucess";
            console.log('Sucesso, login efetuado!')
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

function Main(UserSiteInput) {
    const SiteUName = UserSiteInput[0];
    const SiteUPass = UserSiteInput[1];
    const DBData = GetPass();
    const Auth = Validate(UserSiteInput, );
};