const dotenv = require("dotenv")
const path = require("path")

process.env.NODE_ENV = "test"

dotenv.config({ path: path.join(__dirname, `../environment/.${process.env.NODE_ENV}.env`) })
console.log(process.env.port)
module.exports = {
    // port: process.env.port,
    mongodburl: "mongodb+srv://shubhambhole68:bhole123@demoapp1.ha5dqz2.mongodb.net/?retryWrites=true&w=majority",
    // version: process.env.version,
    // JWT: process.env.JWt,
}