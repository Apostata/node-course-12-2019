import mysql from 'mysql2';

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password: 'root',
    database:'nodesql'
});

export default pool.promise();