const mongoose = require("mongoose");

const userSchems = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isLogin:Boolean
})

module.exports = mongoose.model('user',userSchems);