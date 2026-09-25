



const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userSchema =new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String,
         minLength:4,
        maxLength:50
    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,

        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid Email address" , value)
            }
        }
    },
    password:{
         type:String,
        required:true,

        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("the password is not string" ,value)
            }
        }
    },
    gender:{
        type:String,
        validate(value){
            if(!["male", "female" , "other"].includes(value)){
                throw new Error("gender data is not valid")
            }
        }
    },
    age:{
        type:Number,
        min:18,
        max:100

    },
    about:{
        type:String,
        default:"this is the default abot for user"
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1rfsDuqpnkGagMBi1gBffCvQ35v-79LOHNSmUUcJM_w&s",

        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Url is not correct" ,value)
            }
        }

    },
    skills:{
        type:[String]
    }
} ,{timestamps:true})



userSchema.methods.getJwt =async function(){
    const user = this


    const token = await jwt.sign({_id:user._id} , "THISISME" , {expiresIn:"1h"})

    return token
}


userSchema.methods.comparePasword = async function(userPassword){
    const user = this

    const isCorrectPass =await bcrypt.compare(userPassword , user.password)

    return isCorrectPass



}

const User = mongoose.model("User" , userSchema)

module.exports = User





























// const mongoose =require("mongoose")

// const userSchema =new mongoose.Schema({
//     firstName:{
//         type:String
//     },
//     lastName:{
//         type:String
//     },
//     emailId:{
//         type:String
//     },
//     password:{
//         type:String
//     },
//     age:{
//         type:Number
//     },
//     gender:{
//         type:String
//     }
// })

// const User =mongoose.model("User" ,userSchema)

// module.exports = User