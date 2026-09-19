// console.log("staring the project")

// const express = require("express")

// const app = express()

// app.use("/test" , (req , res)=>{
//     res.json("chacha")

// })


// app.listen(3000 , ()=>{
//     console.log("server is runnning on the 3000")
// })



const express = require("express")

const app = express()


app.use("/sowhat" , (req ,res)=>{
    res.send("sowhat")
})
app.use("/" ,(req ,res)=>{
    res.send("lala chacha")
})



app.listen(3000 , ()=>{
    console.log("hehe chacha")
})

