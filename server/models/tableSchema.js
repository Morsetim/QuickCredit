import { Pool } from 'pg';
// const connectionString = 'postgres://newnkymy:DcRPimLCOcd-IbU6Idu2o21JQDaIDpDq@isilo.db.elephantsql.com:5432/newnkymy'

import dotenv from 'dotenv';

dotenv.config();
const connectionString = process.env.DEV_URL;

const pool =  new Pool(connectionString);
pool.connect();

const createTable = () => {
const createTableText =`

CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(155) NOT NULL,
  lastname VARCHAR(155) NOT NULL,
  email VARCHAR(155) UNIQUE NOT NULL,
  password VARCHAR(155) NOT NULL,
  isAdmin BOOLEAN DEFAULT false,
  status VARCHAR(155) DEFAULT 'unverified',
  balance INTEGER DEFAULT 0,
  status VARCHAR(155) DEFAULT pending,
  homeAddress text,
  workAddress text
);

CREATE TABLE IF NOT EXISTS loans(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(155) NOT NULL,
  lastname VARCHAR(155) NOT NULL,
  email VARCHAR(155) UNIQUE NOT NULL,
  tenor VARCHAR(155) NOT NULL,
  amount INTEGER NOT NULL
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

)`;

pool.query(createTableText, (err, res) => {
    if (err) {
      console.log('-------', err);
      return err.message;
    }
    console.log(res, connectionString)
    pool.end();
  });
};
createTable();