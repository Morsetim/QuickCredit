import {Pool} from 'pg';
import dotenv from 'dotenv';
import configuration from '../config/config';

;
const connectionString = process.env.DEV_URL;
dotenv.config();

const db = new Pool(connectionString);

db.connect().then(() =>{
    console.log('Successfully connected to PosgresDB');
    console.log(connectionString, "==========Connected=========");
}).catch((err) =>{
    console.log(err.message);
});
export default db;