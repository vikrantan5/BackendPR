
const mongoose = require("mongoose")



const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://e-com:w9IA9SL0eBkd8R6w@cluster0.8fq8yez.mongodb.net/mynewDev?appName=Cluster0")
}

module.exports = connectDB


//now the thign is the server is conneting first then mongo db is connected which is not good for the website becuz if the user wanrt comehtign from database then the we know server is runnning but if db is not connectting the req wil goes down





























// const mongoose = require("mongoose")


// const connectDB = async()=>{
//     await mongoose.connect("mongodb+srv://e-com:w9IA9SL0eBkd8R6w@cluster0.8fq8yez.mongodb.net/mynewDev?appName=Cluster0")
// }
// //thsi will return u a promise and tell connected or not
// module.exports={
//     connectDB
// }

