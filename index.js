const express = require("express");
const cors = require("cors");
const UserRouter = require('./router/user');
const ProductRouter =require('./router/product');
require("./db/config");
const app = express();
app.use(cors(), (req, res, next) => {
  next();
});

app.use(express.json());
app.use("/user",UserRouter)
app.use("/product",ProductRouter)




app.listen(4000, () => {
  console.log("server live");
});
