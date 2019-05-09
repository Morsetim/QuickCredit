import userData from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import env from 'dotenv';
import loansData from '../models/loanModel';
import loanRepayment from '../models/loanRepaymentModel';
env.config();

export default class userDatabase {
    static signUp(req, res){
        const userId = userData[userData.length - 1].id + 1;
        const {firstName,lastName, email, password, homeAddress, workAddress} = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        for(let i = 0; i<userData.length; i++){
            if(userData[i].email === email){
                res.status(409).json({
                    status: 409,
                    message: 'User already exists'
                })
            }
        }
        const payload = {
            id:userId,
            email
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 60 * 60 * 10}); // Expires in 10 hours
        req.token = token;
        userData.push({
            id:userId,
            firstName,
            lastName,
            email,
            hashedPassword,
            homeAddress,
            workAddress
        });
        res.status(201)
            .json({
                status: 201,
                data: [{
                    token:token,
                    userData:userData[userData.length - 1]
                }]
            });
        return res.status(401).json({status:401, message:'Unauthorized'});
    }

    static signIn(req, res){
        const {email, password} = req.body;
        const checkData = userData.find(i=> i.email == email);
        console.log(checkData, '========');
        if(checkData){
            const comparePassword = bcrypt.compareSync(password, checkData.hashedPassword);
    
            if(comparePassword){
                const payload = {
                    email
                }
                const token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 60 * 60 * 10 // 10 hours
                  }); 
                  req.token = token;
                   res.status(200)
                    .json({
                      status: 'Success',
                      message: 'successfull login',
                      token
                 });
            }               
        }
        return res.json({status:400, error: 'unauthorized user'})
        }

        static verified(req, res){
        const userProfile  = userData.find(i => i.email === req.params.useremail)
            if(userProfile.homeAddress && userProfile.workAddress != ''){
                 userProfile.status = 'verified';
                res.status(201)
                    .json({
                        status:201,
                        userProfile:userProfile
                    })
            }
        }

        static allLoans(req, res){
            if(loansData.length != 0){
                res.status(201)
                    .json({
                        status: 201,
                        data: [
                            {
                                loansData  
                            }
                        ]
                    });
            }
        }
        static getOneLoan(req, res){
            for(let i=0; i<loansData.length; i++){
                if(loansData[i].id === parseInt(req.params.loanId)){
                    return res.status(201)
                        .json({
                            status: 201,
                            message: `loan with id ${req.params.loanId}`
                        });
                }
            }
            res.status(400)
            .json({
                status: 400,
                message: `loan with id ${req.params.loanId} does not exist in your catalogue`
            });
        }
        static repaidLoans(req, res){
            const repaidLoans = loansData.filter((repaid) =>{
                return repaid.status == 'Approved' && repaid.repaid == 'true';
                
            }) 
            res.status(201)
                    .json({ 
                        status:201, 
                        data: [
                            {
                                repaidLoans:repaidLoans                        
                            }
                        ]

                    });
        }
        static unRepaidLoans(req, res){
            const repaidLoans = loansData.filter((repaid) =>{
                return repaid.status == 'Approved' && repaid.repaid == 'false';
                
            }) 
            res.status(201)
                    .json({ 
                        status:201, 
                        data: [
                            {
                                repaidLoans:repaidLoans                        
                            }
                        ]

                    });
      }
        static repaymentHistory(req, res){
            for(let i=0; i<loansData.length; i++){
                if(loansData[i].id === parseInt(req.params.loanId)){
                     return res.status(201)
                        .json({
                            status  : 201,
                            data  :  {
                                loanId : loansData[i].id,
                                createdOn : loansData[i].createdOn,
                                monthlyInstallment : loansData[i].paymentInstallment,
                                amount : loansData[i].amount
                            }
                        });
                }
            }
        }

        static apply(req, res){
            const newId = loansData[loansData.length - 1].loanId + 1;
            const {firstName, lastName, email, tenor, amount} = req.body;
            const interest = amount * (5/100);
            const monthlyInstallment =+ amount + interest;
            const paymentInstallment = monthlyInstallment / tenor;
            const balance = amount - paymentInstallment
            const status = 'Pending';
            
            loansData.push({
                loanId:newId,
                firstName,
                lastName,
                email,
                tenor,
                amount:parseFloat(amount),
                paymentInstallment,
                status,
                balance,
                interest
            });
            res.status(201)
                .json({
                    status : 201,
                    data : [
                        {
                            loansData
                        }
                    ]
                })
        }
        static updateApproveOrReject(req, res){
            const {status} = req.body;
            for(let i = 0; i<loansData.length; i++){
                if(loansData[i].loanId === parseInt(req.params.loanId)){
                    loansData[i].status = status || loansData.status;
                    return res.status(201)
                        .json({
                            status:201,
                            data : {
                                loanId : loansData[i].loanId,
                                loanAmount : loansData[i].amount,
                                tenor : loansData.tenor,
                                status : loansData[i].status,
                                monthlyInstallment : loansData[i].paymentInstallment,
                                interest : loansData[i].interest
                            } 
                        })
            }
            res.status(422)
                .json({
                    status : 422,
                    message: `loan with id ${req.params.loanId} does not exist in your catalogue`
                })
        }
    }
        static createRepaymentRecord(req, res){
            const newId = loanRepayment[loanRepayment.length - 1].id + 1;
            const {loanId, createdOn, amount, monthlyInstallment, paidAmount, balance} = req.body;
                loanRepayment.find(i => i.loanId === req.params.loanId);
                if(loanRepayment){
                    res.status(422)
                        .json({
                            status : 422,
                            message: `loan with id ${req.params.loanId} already exist in your catalogue`
                        });
                }

            loanRepayment.push({id:newId,
                                 loanId:parseInt(loanId),
                                 createdOn,
                                 amount:parseInt(amount),
                                 monthlyInstallment:parseInt(monthlyInstallment),
                                 paidAmount:parseInt(paidAmount), 
                                 balance:parseInt(balance)
                                });
            res.status(201)
                .json({
                    status : 201,
                    data : {
                        loanRepayment
                    }
                });
        }
    }