

 const userAuth = (req , res , next)=>{
    const isToken = "vikrant";
    const isAuth = isToken==="vikrvvant"
    if(isAuth){
        next()
    }
    else{
        res.status(401).send("password not match")
    }
}

 const adminAuth = (req , res , next)=>{
    const isToken = "vikrant";
    const isAuth = isToken==="vikrangft"
    if(isAuth){
        next()
    }
    else{
        res.status(401).send("password  not match")
    }
}


module.exports = {
    adminAuth , userAuth
}