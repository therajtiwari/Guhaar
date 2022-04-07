// basic script to uplpad to cloudinary
// Not an API

require('dotenv').config({path:__dirname+'/utils/.env'});
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

cloudinary.uploader
.upload("./test.jpg", {
    resource_type: "image",
    function(error, result) {
        console.log(result,error);
    }
}).then(result => {
    console.log("Success",JSON.stringify(result, null, 2));
}).catch(error => {
    console.log("Error",JSON.stringify(error, null, 2));
});

