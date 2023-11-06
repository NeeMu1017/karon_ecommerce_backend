const mongoose = require('mongoose');

const productSchemas = new mongoose.Schema({
    name:String,
    price:String,
    quantity:String,
    img:String
})

module.exports = mongoose.model("product",productSchemas)