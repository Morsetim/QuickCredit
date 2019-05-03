import userData from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import env from 'dotenv';

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
        const finder  = userData.find(i => i.email === req.params.useremail)
            if(finder.homeAddress && finder.workAddress != ''){
                 finder.status = 'verified';
                res.status(201)
                    .json({
                        status:201,
                        finder:finder
                    })
            }
        }
        }
