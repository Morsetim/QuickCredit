import loansData from '../models/db';
import env from 'dotenv';

env.config();

class LoanRepayment{
  repaymentHistory(req, res){
    const {loanId} = req.params;
    const userHistory = `SELECT * FROM loanrepayment WHERE id = $1`;
    const params = [loanId];
    db.query(userHistory, params).then(loan => {
      return res.status(201)
         .json({
             status:201,
             data  :  {
                        loanId : loan[0].id,
                        createdOn : loan[0].createdOn,
                        monthlyInstallment : loan[0].paymentInstallment,
                        amount : loan[0].amount
                    }
         });
    }).catch(err =>res.status(500).json({status: 'Failed', message:err.message}))
  }
  repaymentRecord(req, res){
    const {} = req.body;
  }
}


export default new LoanRepayment();