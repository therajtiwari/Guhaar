// import { cloudinary } from "./utils/cloudinary";
require("dotenv").config({ path: __dirname + "/utils/.env" });
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImage(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "image",
  });
  // console.log(result)
  return result.url;
}

export default function handler(req, res) {
  const file = req.body.img;
  // console.log(file);
  uploadImage(file)
    .then((url) => {
      res.send(url);
    })
    .catch((err) => {
      // console.log(err);
      res.send(err);
    });
}
