const express = require("express")
const app = express()

app.use(express.json())
const connectDB = require("./config/database")
const User = require("./models/user")
const {validateSignUpData ,validateLoginData} = require("./utils/validation")

const bcrypt = require("bcrypt")

const cookieParser= require("cookie-parser")
app.use(cookieParser())
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middlewares/auth")

//we have to give the strict check for the post abd the patch api
app.post("/register" ,async (req , res)=>{

    // validate the data
    // encrypt the password



    //creatting new instance of the user model
    // const user = new User({
    //     firstName:"vikrant nisu ",
    //     lastName:"chacha nisu",
    //     age:15,
    //     about:"this is vikrant singh"
    // })

    try{
            validateSignUp(req)


            const {password ,firstName,lastName , emailId,skills , gender} = req.body
const passwordHash = await bcrypt.hash(password , 10)
console.log(passwordHash)





    const newuser = new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
     
    })
        await newuser.save()
        res.send("user daved to the database")
    }
    catch(err){
        res.status(404).send("this i some error"+err)
    }

    



})


app.post("/login" , async(req ,res)=>{

    try{

        validateLoginData(req)

        const {emailId , password} = req.body
     

        const user = await User.findOne({emailId})

        if(!user){
            throw new Error("email/password not correct")
        }

        

        const isTrue = await user.comparePasword(password)

        if(!isTrue){



            throw new Error("rmail/password not valids")
        }


        const token = await user.getJwt()
        console.log(token)

        res.cookie("token" , token , {expires:new Date(Date.now()+ 8*3600000)})
        res.send("You are logged in successfully")

    }
    catch(err){
        res.status(404).send("there is error"+err)
    }
})



app.get("/profile" , userAuth,async (req ,res)=>{
    try{


    res.send(req.user)
    }
    catch(err){
        res.status(404).send(err.message)
    }
   
})

app.get("/connectionreq" ,userAuth, (req , res)=>{


    console.log(req.user)

    const {firstName, lastName} = req.user

    res.send(firstName +" "+lastName +" "+"sent you the connection resq")
})

connectDB().then(()=>{
    console.log("connecte to DB")
    app.listen(3000 , ()=>{
    console.log("connected to 3000 port")
    })
}).catch(err=>{
    console.log("not connected ")
})














































































































// app.use("/" , (req ,res)=>{
//     res.send("thsiis me vikrant singh")
// })
//agar / route top pe ho to kuch nhi chalega kyuki jo v req aayega wo isse takrakar res bhejde ga duniya ko

// app.get("/user" , (req ,res)=>{
//     res.send("this is th get port")
// })

// app.post("/user" , (req , res)=>{
//     res.send("this is the postroute ")
// })

// //in this there is route and the route ahndler and when the response somr this this is called req handler and when they didi mnot res some this this is cvalled the middlware middleware is nothig  t is the route handler between the req and the request handler



// // us+er ---->it means humlod kitne baar v s de sakte hai
// // us?er------>it mean ki s important nhi hai hata v sakyte hai
// // us*er------>it means the bich me kuch v daal asakte hai
// app.put("/user" , (req ,res)=>{
//     res.send("thsi is th put route")
// })

// app.patch("/user" , (req , res)=>{
//     res.send("thsi is the patch route")
// })

// app.delete("/user" , (req , res)=>{
//     res.send("thsi si the delete route")
// })

// app.listen(3000 , ()=>{
//     console.log("server is running on the port 3000")
// })
































































// const express = require("express");

// const app = express();

// const { connectDB } = require("./config/database");
// const User = require("./models/user")
// const newuserModel = require("./models/newuser")
// app.use(express.json())


// app.post("/signup" ,async (req ,res)=>{


//     console.log(req.body)
// //our server not able to the read json data


//     const user = new User(req.body)

//     try{
//         user.save()
//         res.send("data added successfully")
//     }
//     catch(err){
//         res.status(400).send("there is errpr"+err)
//     }



//         // const user = new User({
//         //     firstName:"virat",
//         //     lastName :"singh",
//         //     emailId:"vikrantsinghan5@gtmail.com",
//         //     password:"vikrant123e"
//         // })

//         // try{
//         //      await user.save()

//         // res.send("user added successfullyt")

//         // }catch(err){
//         //     res.status(400).send("there is some error"+err)
//         // }
       


//         // const user = new newuserModel({
//         //     firstName:"Vikrnt",
//         //     lastName:"Singh",
//         //     emailId:"vikrantsinghan5@gmail.com",
//         //     password:"vikrant12334"
//         // })


//         // try{
//         //       await user.save()
//         // res.send("user saved successfu;lly")
//         // }
//         // catch(err){
//         //     res.status(400).send("there is sn error"+err)
//         // }
      
//     // creating the new instance of the user model
// })




// // finde user
// app.get("/user"  ,async(req , res)=>{
//     const userEmail = req.body.emailId

//     try{
//          const users = await  User.find({emailId:userEmail})
//          if(users.length===0){
//             res.status(404).send("user not found")
//          }
//          else{
//                res.send(users)
//          }
      
//     }
//     catch(err){
//         res.status(400).send("somrthign wen wrong"+err)
//     }
  
// })
// //feed api



// app.get("/feed" , (req, res)=>{

// })


// connectDB().then(() => {
//   console.log("daatbase connected successfully");
//   app.listen(3000, () => {
//     console.log("running on the 3000 port");
//   });
// }).catch(err=>{
//     console.log("getting the eror" + err)
// })

















































// const express = require("express");

// const app = express();
// const {adminAuth, userAuth} =require("./middlewares/auth")

// app.use("/user" ,userAuth )

// app.get("/user/editProfiledata" ,(req , res)=>{
//     res.send("user")
// } )

// app.get("/admin/deleteDate" , adminAuth,(req , res)=>{
//     res.send("deleting th user")
// })

// app.listen(3000, () => {
//   console.log("hehe chacha");
// });

// // app.get(
// //   "/user",
// //   (req, res , next) => {
// //     // route handler
// //     // res.send("rout handler 1");
// //     //kuch send nhi karenge  to atak jayega
// //     //after time out nothing will return
// //     // we have to send the response back
// //     next()
// //     res.send("chcha");
// //     console.log("pahla")

// //     console.log("dusra")
// //   },
// //   (req, res) => {
// //     // res.send("handling route from route handler 2");
// //   },
// // );

// // console.log("staring the project")

// // const express = require("express")

// // const app = express()

// // app.use("/test" , (req , res)=>{
// //     res.json("chacha")

// // })

// // app.listen(3000 , ()=>{
// //     console.log("server is runnning on the 3000")
// // })
// // app.get(
// //   "/user",
// // [  (req, res, next) => {
// //     // res.send("first route handler");
// //     next();
// //   },
// //   (req, res, next) => {
// //     // res.send("sec route handler");
// //     next();
// //   }],
// //   (req, res, next) => {
// //     // res.send("thir route handler");
// //     next();
// //   },
// //   (req, res, next) => {
// //     res.send("fourth route handler");
// //     // next();
// //   }
// // );

/*

app.get("/user" , (req , res)=>{
    res.send("thi is the hget ")
})


app.post("/user" , (req , res)=>{
    res.send("thsi is th epost")
})

app.put("/user" ,(req , res)=>{
    res.send("ths is the put")
})

app.patch("/user" , (req , res)=>{
    res.send("thsi is the patch")
})

app.delete("/user" , (req , res)=>{
    res.send("this is the delete-------------------------------------")
})




app.use("/"  , (req ,res)=>{
    res.send("this will run on every port")
})

*/














// //find user by emailk

// app.get("/user" ,async (req ,res)=>{
//     const email =req.body.email

//     try{

//         console.log(email)
    
//     const  user = await User.findOne({emailId:email})

//     if(!user){
//         res.status(404).send("user hi nhi h")
//     }
//         res.send(user)

      
//     }catch(err){
//         res.status(404).send("error hao pira")
//     }
// })
// //feed api

// app.get("/feed" ,async (req , res)=>{


//     try{
//     const user = await User.find({})
//     console.log(user)
//     res.send(user)
//     }
//     catch(err){
//          console.log(err);
//         res.status(500).send("thsi si error")
//     }


// })



// app.delete("/delete" ,async (req , res)=>{

//     const userId = req.body.userId

//     try{
//          await User.findByIdAndDelete({_id:userId})


//     res.send("user deleted")
//     }
//     catch(err){
//         res.status(404).send("there is some erorr in the de;ete")
//     }
   

// })



// app.patch("/user/:userId" ,async(req ,res)=>{
//     const userId = req.params.userId
//     const data = req.body


//     try{
//     const ALLOWED_UPDATES = ["firstName" , "lastName" , "age" , "gender" , "skills"]
//    const isupdateAllowed = Object.keys(data).every((k)=>{
//      return (ALLOWED_UPDATES.includes(k))
//    })

//    if(!isupdateAllowed){
//         throw new Error("there is somthing forbidden`")
//    }

//    if(data?.skills){
//     if(data.skills.length >6){
//         throw new Error("baap ka maal nhi h")
//     }
//    }


//     await  User.findOneAndUpdate({_id:userId} , data , {
//             returnDocument:"after",
//             runValidators:true
//         })
//         res.send("update successfully")
//     }
//     catch(err){
//         // console.log(err)
//     res.status(400).send(err.message)
//     }
   


// })

// app.get("/user" , (req ,res ,next)=>{
//     // res.send("this route handler 1")
//     next();
// },
// (req , res ,next)=>{
//     // res.send("thsi is the 2nd route handler")
//     next()
// } , 
// (req , res , next)=>{
//     res.send("thsi si the 3rd route handler")
//     next()
// },
// (req , res , next)=>{
//     res.send("thdis si the 4th route handler")
//     // next()
// }
// )
