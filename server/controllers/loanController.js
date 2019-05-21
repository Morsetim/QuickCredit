import loanData from '../models/db';
import env from 'dotenv';
import db from '../models/db';

env.config();

class LoanController{
  apply(req, res){
    const {firstname, lastname, email, tenor, amount} = req.body;
    const interest = amount * (5/100);
    const monthlyInstallment =+ amount + interest;
    const paymentInstallment = monthlyInstallment / tenor;
    const balance = amount - paymentInstallment
    const status = 'Pending';
    const sql = 'INSERT INTO loans(firstname, lastname, email, tenor, amount) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const params = [firstname, lastname, email, tenor, amount];

    loanData.query(sql, params).then(loan=>{
      return res.status(201)
                .json({
                    status : 201,
                    data : [
                        {
                            loan:loan[0]
                        }
                    ]
                });
    })
  }
}