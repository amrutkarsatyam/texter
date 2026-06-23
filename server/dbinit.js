/*

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

const pool= mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'satyam',
    database:'texter',
    waitForConnections:true,
    connectionLimit: 10,
    queueLimit:0
});

export default pool;

*/

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;
