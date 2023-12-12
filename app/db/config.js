const mongoose = require("mongoose");

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
module.exports = connectDB
