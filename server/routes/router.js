import express from 'express';
import userController from '../controllers/userController';
import userValidator from '../middlewares/uservalidation'
import authToken from '../middlewares/tokenAuthentication';

const router = express.Router();

router.route('/auth/signup')
.post(userValidator.signUp, userController.signUp);

router.route('/auth/signin')
.post(userValidator.signIn, authToken, userController.signIn);


export default router;