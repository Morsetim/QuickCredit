import loanData from '../models/db';
import env from 'dotenv';
import db from '../models/db';

env.config();

class LoanController{
  apply(req, res){
    const {firstName, lastName, email, tenor, amount} = req.body;
    const interest = amount * (5/100);
    const monthlyInstallment =+ amount + interest;
    const paymentInstallment = monthlyInstallment / tenor;
    const balance = amount - paymentInstallment
    const status = 'Pending';
    const sql = 'INSERT INTO loans(firstname, lastname, email, tenor, amount) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const params = [firstName, lastName, email, tenor, amount];
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
    }).catch(err =>res.status(500).json({status: 'Failed', message:err.message}))
  }
  allLoans(req, res){
    const sql = `SELECT * FROM loans`
    loansData.query(sql).then(loan=>{
      return res.status(201)
                .json({
                    status : 201,
                    data : [
                        {
                            allLoan:loan
                        }
                    ]
                });
    }).catch(err =>res.status(500).json({status: 'Failed', message:err.message}))
  }
  getOneLoan(req, res){
    const loanId = req.params;
    const sql = `SELECT * FROM loans WHERE id=${loanId}`
    loansData.query(sql).then(loan =>{
      if(loan){
      return res.status(201)
                .json({
                    status : 201,
                    data : [
                        {
                            specificLoan:loan
                        }
                    ]
                });
      }else{
        return res.status(400)
                .json({
                    status : 400,
                    message : `loan with id ${loan} does not exist in your catalogue`
                });
      }
    }).catch(err =>res.status(500).json({status: 'Failed', message:err.message}))
  }
  unrepaidLoan(req, res){
    const sql = `SELECT FROM loans WHERE status=$1 repaid=$2`
    const params = ['approved', 'false'];
    loansData.query(sql,params).then(unrepaid=>{
      if(unrepaid){
        return res.status(201)
                .json({
                    status : 201,
                    message: 'All unrepaid loans',
                    unrepaid: unrepaid
                });
      }
      return res.status(400)
                .json({
                    status : 400,
                    message: 'No unrepaid loans'
                });
    }).catch(err =>res.status(500).json({status: 'Failed', message:err.message}))
  }
  repaidLoan(req, res){
    const sql = `SELECT FROM loans WHERE status=$1 repaid=$2 balance=$3`
    const params = ['approved', 'true', 0];
    loansData.query(sql,params).then(repaid=>{
      if(repaid){
        return res.status(201)
                .json({
                    status : 201,
                    message: 'All repaid loans',
                    repaid: repaid
                });
      }
      return res.status(400)
                .json({
                    status : 400,
                    message: 'No repaid loans'
                });
    }).catch(err =>res.status(500).json({status: 'Failed', message:err.message}))
  }

}

export default new LoanController();