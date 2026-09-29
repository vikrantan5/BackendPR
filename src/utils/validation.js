const User = require("../models/user")
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

// "firstName" , "lastName" , "age" , "about" , "skills" , "gender"

const validateEditProfileData =(req)=>{
   const {firstName , lastName , age , about , skills} = req.body



    if(firstName.length <4 ||firstName.length >50 ||lastName.length <4 ||lastName.length>50){
        throw new Error("length exceedede")
    }


    if(age <18 || age >100){
        throw new Error("chale jaaa")
    }

    if(about?.length >500){
        throw new Error("itna lamba cholbe na")
    }

    if(skills?.length>6){
        throw new Error("bobohot jyada h ")
    }

}


const validateEnterPass =async (req)=>{
    const {enterOriginalPassword , enterNewPassword} = req.body

    const user = req.user

    const isTrue = await  user.comparePasword(enterOriginalPassword)

    if(! isTrue){
        throw new Error("Password is wrong")
    }

    if(! validator.isStrongPassword(enterNewPassword)){
        throw new Error("given password is not string cant be changes")
    }




}
module.exports = {validateSignUpData ,validateLoginData , validateEditProfileData,validateEnterPass} 