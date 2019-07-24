import express from 'express';
import userController from '../controllers/userController';
import userValidator from '../middlewares/uservalidation';
import loanController from '../controllers/loanController';
import authToken from '../middlewares/tokenAuthentication';
import loanValidator from '../middlewares/loanValidation';
import loanRepayments from '../controllers/loanRepayment';
import loanRepaymentValidation from '../middlewares/loanRepaymentValidation';
import checkAdmin from '../middlewares/checkAdmin';

const router = express.Router();

// user route
router.route('/auth/signup')
  .post(userValidator.signUp, userController.signUp);

router.route('/auth/signin')
  .post(userValidator.signIn, userController.signIn);

router.route('/users/:useremail/verify')
  .patch(authToken, checkAdmin, userController.verified);

router.route('/users/:id')
  .patch(authToken, userController.updateUserRole);
// loans route
router.route('/loans')
  .get(authToken, loanController.allLoans)
  .post(authToken, loanValidator.applyLoan, loanController.apply);

router.route('/loans/:loanId')
  .get(authToken, loanController.getOneLoan)
  .patch(authToken, loanController.approved)

router.route('/loans/user')
  .get(authToken, loanController.userLoanList)

router.route('/loans/repaid')
  .get(authToken, loanController.repaidLoan)
router.route('/loans/unrepaid')
  .get(authToken, loanController.unrepaidLoan);

router.route('/loans/:loanId/repayment')
  .get(authToken, loanRepayments.repaymentHistory)
  .post(authToken, loanRepayments.repaymentRecord, loanRepaymentValidation.postRepayment);


export default router;