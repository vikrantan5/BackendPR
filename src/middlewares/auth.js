const User = require("../models/user")

const jwt = require("jsonwebtoken")
 const userAuth = async(req , res , next)=>{

    //read the token from the req cookies


    try{
            const {token} = req.cookies

    if(!token){
        throw new Error("Please login again")
    }

    const decodedMessage = await jwt.verify(token , "THISISME")

    const {_id} =decodedMessage


    const user = await User.findById({_id})

    if(!user){
        throw new Error("please login again")
    }

    req.user = user
    next()
    }
    catch(err){
        res.status(404).send(err.message)
    }




    // validate th e token
    // find the user



}



module.exports = {
      userAuth
}