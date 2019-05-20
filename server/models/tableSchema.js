import { Client } from 'pg';
// const connectionString = 'postgres://newnkymy:DcRPimLCOcd-IbU6Idu2o21JQDaIDpDq@isilo.db.elephantsql.com:5432/newnkymy'

const connectionString = process.env.DEV_URL;

const client =  new Client(connectionString);
client.connect();

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

 client.query(createTableText, (err) => {
  if (err) {
    return err.message;
  }
  client.end();
});
};
createTable();