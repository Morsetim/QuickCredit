"use strict";

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var connectionString;

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

var pool = new _pg.Pool(connectionString);
pool.connect();

var createTable = function createTable() {
  var createTableText = "\n\nDROP TABLE IF EXISTS users CASCADE;\n\nDROP TABLE IF EXISTS loans CASCADE;\n\nDROP TABLE IF EXISTS loanrepayment CASCADE;\n\nCREATE TABLE IF NOT EXISTS users(\n  id SERIAL PRIMARY KEY,\n  firstname VARCHAR(155) NOT NULL,\n  lastname VARCHAR(155) NOT NULL,\n  email VARCHAR(155) UNIQUE NOT NULL,\n  password VARCHAR(155) NOT NULL,\n  isAdmin BOOLEAN DEFAULT false,\n  status VARCHAR(155) DEFAULT 'unverified',\n  balance INTEGER DEFAULT 0,\n  homeAddress text,\n  workAddress text\n);\n\nCREATE TABLE IF NOT EXISTS loans(\n  userId int REFERENCES users(id) ON DELETE CASCADE,\n  id SERIAL PRIMARY KEY,\n  tenor VARCHAR(155) NOT NULL,\n  paymentInstallment INTEGER NOT NULL,\n  interest INTEGER NOT NULL,\n  balance INTEGER NOT NULL,\n  amount INTEGER NOT NULL,\n  repaid BOOLEAN DEFAULT false,\n  status VARCHAR(155) DEFAULT 'pending'\n);\n\nCREATE TABLE IF NOT EXISTS loanrepayment(\n  id SERIAL PRIMARY KEY,\n  userId int REFERENCES users(id) ON DELETE CASCADE,\n  loanId int REFERENCES loans(id) ON DELETE CASCADE,\n  date timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  amount INTEGER NOT NULL,\n  monthlyInstallment INTEGER NOT NULL,\n  balance INTEGER NOT NULL\n)";
  pool.query(createTableText, function (err) {
    if (err) {
      return err.message;
    }

    pool.end();
  });
};

createTable();