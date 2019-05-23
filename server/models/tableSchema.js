import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString;

if (process.env.NODE_ENV == 'production') {
  connectionString = {
    user: 'irizohhagtpyta',
    database: 'd8l6f1inbgo5nv',
    password: '760a36527410284fdf3bb17867cc6547a2e02709a047dca5a40dd4075d24adde',
    host: 'ec2-23-21-148-223.compute-1.amazonaws.com',
    port: 5432
  };
}

if (process.env.NODE_ENV == 'development') {
  connectionString = process.env.DEV_URL;
}

const pool = new Pool(connectionString);
pool.connect();

const createTable = () => {

const createTableText =`

DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS loans CASCADE;

DROP TABLE IF EXISTS loanrepayment CASCADE;

CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(155) NOT NULL,
  lastname VARCHAR(155) NOT NULL,
  email VARCHAR(155) UNIQUE NOT NULL,
  password VARCHAR(155) NOT NULL,
  isAdmin BOOLEAN DEFAULT false,
  status VARCHAR(155) DEFAULT 'unverified',
  balance INTEGER DEFAULT 0,
  homeAddress text,
  workAddress text
);

CREATE TABLE IF NOT EXISTS loans(
  userId int REFERENCES users(id) ON DELETE CASCADE,
  id SERIAL PRIMARY KEY,
  tenor VARCHAR(155) NOT NULL,
  paymentInstallment INTEGER NOT NULL,
  interest INTEGER NOT NULL,
  balance INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  repaid BOOLEAN DEFAULT false,
  status VARCHAR(155) DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS loanrepayment(
  id SERIAL PRIMARY KEY,
  userId int REFERENCES users(id) ON DELETE CASCADE,
  loanId int REFERENCES loans(id) ON DELETE CASCADE,
  date timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  amount INTEGER NOT NULL,
  monthlyInstallment INTEGER NOT NULL,
  balance INTEGER NOT NULL
)`;

pool.query(createTableText, (err) => {
  if (err) {
    return err.message;
  }
  pool.end();
});

};
createTable();

