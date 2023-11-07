const express = require("express");
const Product = require("../db/Product");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const router = express();

cloudinary.config({
  cloud_name: "dliapsmgm",
  api_key: "163533345547947",
  api_secret: "BX5vk_4JdUGyXp3s1YAr350MQHo",
});

const storageEngine = multer.diskStorage({
  destination: "./upload/image",
  filename: (req, file, cb) => {
    return cb(null, `${file.filename}_${Date.now()}${file.originalname}`);
  },
});

const upload = multer({
  storage: storageEngine,
});

router.use(express.json());
//get all product

router.get("/", async (req, res) => {
  res.status(200).send(Product.find({}));
});

//add product api
router.post("/add", upload.single("img"), async (req, res) => {
  if (req.file) {
    cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        return res.send({ massge: "error from cloudinary" });
      }

      const { name, price, } = req.body;
      const product = new Product({
        name,
        price,
        quantity,
        img: result.url,
      });
      //  res.send(product.save())
      res.send(await product.save());
      fs.unlinkSync(req.file.path);
    });
  }
});

///firebase connecteed
const storage = new Storage({
  keyFilename:
    "./firebase/ecommerapp-957c2-firebase-adminsdk-wt9lf-c6e30d4344.json",
});

const bucket = storage.bucket("gs://ecommerapp-957c2.appspot.com");
const uploaderr = multer({
  storage: multer.memoryStorage(),
});
//firebase (google cloud storage) leter finsh that requist 
router.post("/fire", uploaderr.single("img"), (req, res) => {
  if (!req.file) {
    res.status(400).send({ massge: " Image not Found" });
  }
  const { name, price, quantity } = req.body;
  const product = new Product({
    name,
    price,
    quantity,
    img: "",
  });

  const bolb = bucket.file(req.file.originalname);
  const bolbsystems = bolb.createWriteStream();
  bolbsystems.on("err",(err)=>{
    res.status(400).send("Error gate uploading the Image")
  })
  bolbsystems.on("finish",()=>{
    Product.img = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    product.save();
    res.send("ok")
  })
  
  bolbsystems.end(req.file.buffer);
});
module.exports = router;
