import {Pool} from 'pg';
import dotenv from 'dotenv';


dotenv.config();


const connectionString = process.env.DEV_URL || 'development';
const db = new Pool({connectionString});
db.connect().then(() =>{
    console.log('Successfully connected to PosgresDB');
    console.log(connectionString, "==========Connected=========");
}).catch((err) =>{
    console.log(err.message);
});
export default db;