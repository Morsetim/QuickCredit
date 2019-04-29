import express from 'express';
import userController from '../controllers/userController';
import userValidator from '../middlewares/uservalidation'
// import authToken from '../middlewares/tokenAuthentication';

const router = express.Router();

router.route('/auth/signup')
.post(userValidator.signUp, userController.signUp)



export default router;

