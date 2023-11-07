const express = require("express");
const mongoose = require("mongoose");
const connected = require("../connection");
const app = express();
app.use(express.json());

// chake connected funcation
//const getdata = async () => {
//  const newuser = {
//    name: "mayur randeri",
//    email: "mayurrrr@gmail.com",
//    password: "mayu26351",
//  };
//  // schema = connect monngoose model("collection name", connected with funcation )
//  const sttd = mongoose.model("user", (await connected.connected()).user);
//  return sttd(newuser).save();
//};




// post api
app.post("/", async (req, res) => {
  let { name, email, password } = req.body;
  const postdata = mongoose.model("user", (await connected.connected()).user);
  res.send(await postdata({name,email,password}).save())
});

//logout api post method



app.listen(3002, ()=>{
    console.log("sever live");
})