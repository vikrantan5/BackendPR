

const mongoose = require("mongoose")

const newuserSchema =  new mongoose.Schema({
        firstName:{
            type:String
        },
        lastName:{
            type:String
        },
        emailId:{
            type:String
        },
        password:{
            type:String
        },
        age:{
            type:Number
        },
        about:{
            type:String
        }
})

const newuserModel = mongoose.model("Usernew" , newuserSchema)

module.exports = newuserModel