import express from 'express';
import userController from '../controllers/userController';
import userValidator from '../middlewares/uservalidation';
import loanController from '../controllers/loanController';
import authToken from '../middlewares/tokenAuthentication';
import loanValidator from '../middlewares/loanValidation';
import repaymentValidator from '../middlewares/loanRepaymentValidation';
import verifyValidation from '../middlewares/verifiedValidation';

const router = express.Router();

router.route('/auth/signup')
.post(userValidator.signUp, userController.signUp);

router.route('/auth/signin')
.post(userValidator.signIn, userController.signIn);

router.route('/users/:useremail/verify')
.patch(userController.verified);


// router.route('/loans')
// .get(authToken, userController.allLoans)
// router.route('/loans/repaid')
// .get(userController.repaidLoans)
// router.route('/loans/unrepaid')
// .get(userController.unRepaidLoans);

// router.route('/loans/:loanId')
// .get(authToken, userController.getOneLoan)
// .patch(userController.updateApproveOrReject)
// router.route('/loans/:loanId/repayment')
// .get(userController.repaymentHistory)
// router.route('/loans/:loanId/repayment')
// .post(repaymentValidator.postRepayment, userController.createRepaymentRecord)

router.route('/loans')
.post(loanValidator.applyLoan, loanController.apply)





export default router;