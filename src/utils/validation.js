
const validator = require("validator")

const validateSignUpData = (req)=>{
    const {firstName , lastName , emailId , password} = req.body

    if(!firstName || !lastName){
        throw new Error("First NAme and last name not give")
    }

    else if(firstName.length <4 ||firstName.length >50 ||lastName.length <4 ||lastName.length>50){
        throw new Error("length exceedede")
    }

    if(! validator.isEmail(emailId)){
        throw new Error("enter proper email id")
    }
    if(! validator.isStrongPassword(password)){
        throw new Error("enter strong paassword")
    }


}


const validateLoginData = (req)=>{
    const {emailId , password} = req.body

    if(! validator.isEmail(emailId)){
        throw new Error("email/password is not correct")
    }
    if(! validator.isStrongPassword(password)){
        throw new Error("email/password not correct")
    }
}


module.exports = {validateSignUpData ,validateLoginData} 