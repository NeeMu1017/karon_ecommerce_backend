const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/ecommerce"

const connected = async () => {
  await mongoose.connect(url);
  const user = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isLogin:Boolean
  });
  return {user}
};

module.exports={connected}