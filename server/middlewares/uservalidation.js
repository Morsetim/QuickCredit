import validator from 'validator';


class userValidator{
    signUp(req, res, next){

        const {firstName, lastName, email, password, homeAddress, workAddress} = req.body;
        const catchErrors = {};

        if(firstName == undefined || lastName == undefined || email == undefined || password == undefined ||homeAddress == undefined || workAddress === undefined){
            return res.status(400).json({status:'Failed', message:'All some fields are empty'});
        }
        if(!validator.isLength(firstName, {min:2})){
            catchErrors.firstName = 'First name length must be at least two characters long';
        }
        if(firstName.search(/^[a-zA-Z]*$/) === -1){
            catchErrors.firstName = 'Firstname should only be Alphabets';
        }
        if(!validator.isLength(lastName, {min:2})){
            catchErrors.lastName = 'Lastname length must be at least two characters long';
        }
        if(lastName.search(/^[a-zA-Z]*$/) === -1){
            catchErrors.lastName = 'Lastname should only be Alphabets';
        }
        if(!validator.isEmail(email)){
            catchErrors.email = 'Field must be an Email format';
        }
        if(!validator.isEmpty(password)){
            if(!validator.isLength(password, {min:6})){
                catchErrors.isLength = 'Password length must be at least six characters long';
            }
        }else{
            catchErrors.password = 'Field cannot be Empty';
        }
        if(Object.keys(catchErrors).length != 0){
            return res.status(400).json({catchErrors});
        }
        next();
}

    signIn(req, res, next){
        const {email, password} = req.body;
        signErrors = {};
        if(email == undefined || password == undefined){
        return res.status(400).json({status:'Failed', message:'All some fields are empty'}); 
        }
        if(!validator.isEmail(email)){
            signErrors.email = 'Field must be an Email format';
        }
        if(!validator.isEmpty(password)){
            if(!validator.isLength(password, {min:6})){
                signErrors.isLength = 'Password length must be at least six characters long';
            }
        }else{
            signErrors.password = 'Field cannot be Empty';
        }
        if(Object.keys(signErrors).length != 0){
            return res.status(400).json({signErrors});
        }
        next();
    }
}

export default new userValidator();