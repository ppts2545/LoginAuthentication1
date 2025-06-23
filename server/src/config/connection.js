//MYSQL DATABASE
const mysql = require('mysql2');
let mysqlConnection;
async function connectMYSQL(){
    try{
        mysqlConnection = await mysql.createConnection({
            host: process.env.MYSQL_HOST || 'localhost',
            user: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASSWORD || 'SudoPo13166m',
            database: process.env.MYSQL_DB || 'loginSystem1_db',
        });
        console.log('✅ MySQL connected');
    } catch(err) {
        console.error('MySQL connection error:', err);
    }
}

connectMYSQL();

module.exports = connectMYSQL;