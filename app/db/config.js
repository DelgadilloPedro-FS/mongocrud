const mongoose = require("mongoose");
const User = require("../models/User");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology:true,
    });
    console.log(`welcome to mongo db on ${conn.connection.host}`);
  } catch (error) {
    console.log("this is an error",error);
  }
};

const saveUser = async (newUser) =>{
  return await newUser.save();
}
const findUser = async (object) =>{
  return await User.find(Object).exec();
}

module.exports = {connectDB, findUser, saveUser}
