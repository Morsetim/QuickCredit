import {Pool} from 'pg';

import dotenv from 'dotenv';

dotenv.config();

let connectionString;

if (process.env.NODE_ENV == 'production') {
  connectionString = process.env.DATABASE_URL;
}

if (process.env.NODE_ENV == 'development') {
  connectionString = process.env.DEV_URL;
}

const db = new Pool(connectionString);

db.connect().then(() =>{
    console.log('Successfully connected to PosgresDB');
    console.log(connectionString, "==========Connected=========");
}).catch((err) =>{
    console.log(err.message);
});
export default db;