const mysql = require('mysql2');

const connection = mysql.createConnection({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'star_wars'
});

connection.connect((erreur) => {
    if (erreur) {
        console.log("connexion OK", erreur)
    };
    console.log("connexion OK");
});
module.exports = connection;
