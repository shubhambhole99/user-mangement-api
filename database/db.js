// const mongoose = require("mongoose")
// const config = require("../config/config")
// // console.log(config)
// s = "mongodb+srv://shubhambhole68:bhole123@demoapp1.ha5dqz2.mongodb.net/?retryWrites=true&w=majority"
// mongoose.connect(s).then(() => {

//     console.log("database connection is established")
// }).catch((err) => {
//     console.log("error while connecting in database", err)
// })


const mongoose = require("mongoose");
const config = require("../config/config");

const localDBURI = "mongodb://localhost:27017/Zeeshan"; // Update this with your local MongoDB URI

mongoose.connect(localDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Database connection is established");
}).catch((err) => {
  console.log("Error while connecting to the database:", err);
});