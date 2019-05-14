import validator from 'validator';

class loanValidator{
    applyLoan(req, res, next){

        const {firstName, lastName, email, tenor, amount} = req.body
        const fieldsErrors = {};

        if(firstName == undefined || lastName == undefined || email == undefined || tenor == undefined ||amount == undefined){
            return res.status(400).json({status:'Failed', message:'All or some fields are empty'});
    }
        if(!validator.isLength(firstName, {min:2})){
            fieldsErrors.firstName = 'First name length must be at least two characters long';
    }
        if(firstName.search(/^[a-zA-Z]*$/) === -1){
        fieldsErrors.firstName = 'Firstname should only be Alphabets';
    }
    if(!validator.isLength(lastName, {min:2})){
        fieldsErrors.lastName = 'Lastname length must be at least two characters long';
    }
    if(lastName.search(/^[a-zA-Z]*$/) === -1){
        fieldsErrors.lastName = 'Lastname should only be Alphabets';
    }
    if(!validator.isEmail(email)){
        fieldsErrors.email = 'Field must be an Email format';
    }
    if(validator.isEmpty(tenor)){
        if(tenor.search(/^[0-9]*$/) === -1){
            fieldsErrors.tenor = 'Please input number';
        }
        fieldsErrors.tenor = 'Tenor field cannot be empty';
    }
    if(validator.isEmpty(amount)){
        if(amount.search(/^[0-9]*$/) === -1){
            fieldsErrors.amount = 'Please input numbers';
        }
        fieldsErrors.amount = 'Amount field cannot be empty';
    }
    if(!validator.isLength(amount, {min:4, max:6})){
        fieldsErrors.amount = 'We only grant a loans of 1000 above and 500,000 below';
}
    if(Object.keys(fieldsErrors).length != 0){
        return res.status(400).json({fieldsErrors});
    }
    next();
}
}

export default new loanValidator();