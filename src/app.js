const express = require("express")

const app = express()





app.listen(3000 , ()=>{
    console.log("running on the 3000 port")
})









































































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