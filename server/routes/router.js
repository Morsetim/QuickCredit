import express from 'express';
import userController from '../controllers/userController';
import userValidator from '../middlewares/uservalidation';
import loanController from '../controllers/loanController';
import authToken from '../middlewares/tokenAuthentication';
import loanValidator from '../middlewares/loanValidation';
import loanRepayments from '../controllers/loanRepayment';
import checkAdmin from '../controllers/helpers/checkAdmin';
import repaymentValidator from '../middlewares/loanRepaymentValidation';


const router = express.Router();

router.route('/auth/signup')
  .post(userValidator.signUp, userController.signUp);

router.route('/auth/signin')
  .post(authToken, userValidator.signIn, userController.signIn);

router.route('/users/:useremail/verify')
  .patch(authToken, checkAdmin, userController.verified);


router.route('/loans')
  .get(authToken, checkAdmin,loanController.allLoans);

  router.route('/loans/user')
  .get(authToken,loanController.userLoanList)

router.route('/loans/repaid')
  .get(loanController.repaidLoan)
router.route('/loans/unrepaid')
  .get(authToken, checkAdmin,loanController.unrepaidLoan);

router.route('/loans/:loanId')
  .get(authToken, checkAdmin, loanController.getOneLoan)
  .patch(authToken, checkAdmin,loanRepayments.repaymentHistory)
router.route('/loans/:loanId/repayment')
// .get(userController.repaymentHistory)
// router.route('/loans/:loanId/repayment')
// .post(repaymentValidator.postRepayment, userController.createRepaymentRecord)

router.route('/loans')
  .post(authToken,loanValidator.applyLoan, loanController.apply)





export default router;