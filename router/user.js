const express = require("express");
const router = express.Router();
const user = require("../db/User");
router.use(express.json());

router.get("/", async (req, resp) => {
  resp.send(await user.find({}));
});


// login api to call find data from database if data is not vaild give 400 statuse
router.post("/auth", async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: "email and password require" });
  }
  try {
    let fountuser = await user.findOne({ email, password });
    !fountuser
      ? res.status(401).send("data not found")
      : res.status(200).send(fountuser);
  } catch {
    (err) => {
      console.log(err);
    };
  }
  //res.send(fountuser);
});

router.post("/", async (req, res) => {
  const User = new user({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isLogin: true,
  });
  if (!User.name || !User.email || !User.password) {
    res.status(400).send("data require");
  } else {
    await User.save();
    res.status(200).send(User);
  }
});

module.exports = router;
