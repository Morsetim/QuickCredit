import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const connectionString = process.env.DEV_URL;

const pool =  new Pool(connectionString);
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
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(155) NOT NULL,
  lastname VARCHAR(155) NOT NULL,
  email VARCHAR(155) UNIQUE NOT NULL,
  tenor VARCHAR(155) NOT NULL,
  monthlyInstallment INTEGER NOT NULL,
  paymentInstallment INTEGER NOT NULL,
  interest INTEGER NOT NULL,
  balance INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  repaid BOOLEAN DEFAULT false,
  status VARCHAR(155) DEFAULT 'approved'
);
CREATE TABLE IF NOT EXISTS loanrepayment(
  id SERIAL PRIMARY KEY,
  userId int REFERENCES users(id) ON DELETE CASCADE,
  loanId int REFERENCES loans(id) ON DELETE CASCADE,
  date timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  amount INTEGER NOT NULL,
  monthlyInstallment INTEGER NOT NULL,
  paidAmount INTEGER NOT NULL,
  balance INTEGER NOT NULL
);
`;

pool.query(createTableText, (err) => {
  if (err) {
    return err.message;
  }
    pool.end();
  });
};
createTable();