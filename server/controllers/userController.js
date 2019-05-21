import userData from '../models/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import env from 'dotenv';
import loansData from '../models/loanModel';
import loanRepayment from '../models/loanRepaymentModel';
env.config();

 class UserController {
     signUp(req, res){
        const {firstName,lastName, email, password, homeAddress, workAddress} = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        userData.query(`SELECT id FROM users WHERE email = '${email}'`)
        .then((userfind) =>{
          if(userfind.rows.length === 1){
            return res.status(409)
                  .json({
                    status: 'Failed',
                    message: 'User Already Exist'
                  });
          }
          const sql = 'INSERT INTO users(firstName, lastName, email, password, homeAddress, workAddress) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
          const params = [firstName, lastName, email, hashedPassword, homeAddress, workAddress];
          userData.query(sql, params)
          .then((user) =>{
            const payload = {
              email
              };
              const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: 60 * 60 * 10 // 10 hours
              });
              req.token = token;
              return res.status(201)
              .json({
                status: 201,
                message: 'Successfully created QuickCredit account',
                token:token,
                userProfile: user.rows[0]
              });
          }).catch(err => res.status(500).json({status:'Failed', message:err.message}));
        }).catch(err => res.status(500).json({status:'Failed', message:err.message}));
    }

    signIn(req, res){
        const {email, password} = req.body;
        userData.query(`SELECT * FROM users WHERE email = '${email}'`).then((user) =>{
          if(user.rows.length === 1){
          const checkHash = bcrypt.compareSync(password, user.rows[0].password);
          if(checkHash){
            const payload ={
              email,
            };
          const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 60 * 60 * 10}); // Expires in 10 hours
          req.token = token;
          return res.status(201)
                  .json({
                    status: 'Success',
                    message: 'successfull login',
                    userData: user.rows[0],
                    token
                  });
          }
          }
          return res.status(422)
                    .json({
                      status: 'Failed',
                      message: 'Invalid Email or Password'
        });
        }).catch(err =>res.status(500).json({status:'Failed', message:err.message}));
      }

    }

    export default new UserController();