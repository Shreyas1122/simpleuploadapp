const express=require('express');
const parse=require('body-parser');
const firstrouter=require('./Routes/simplerouter');
const db=require('./dbconnect/databaseconnect');
const multer=require('multer');
const cloudinary=require('cloudinary')
const path = require("path");
const {createClient} = require('@supabase/supabase-js');
const fs = require('fs');


const ImageKit = require("imagekit");

const app=express();




    // Configuration of cloudinary 
    cloudinary.config({ 
        cloud_name: 'dmas5gmnx', 
        api_key: '232989846571566', 
        api_secret: 'fMBAwb_M4_S_r0QgFLfshC5umwM' // Click 'View API Keys' above to copy your API secret
    });

    


    //configuration of the imagekit
    const imagekit = new ImageKit({
      publicKey: "public_Xs+f3gUYATgDBgpiN+3DnPLJia8=",
      privateKey: "private_GM0Fd1ulQG8bAsNCWrAG64a4FSw=",
      urlEndpoint: "https://ik.imagekit.io/cxf1trzwj"
  });




//for image 

const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'Uploads/');
  },
  filename:function(req,file,cb){
    cb(null,Date.now() + "-" +file.originalname);
  }
})



// //for image 
 const upload=multer({storage});







app.use(parse.urlencoded());

app.set('view engine','ejs');
app.set('views',path.join(__dirname, "./Views"));
app.get("/home",firstrouter.application);
//app.post("/result",uploadvideo.single('video'),firstrouter.uploadvideo);
//app.post("/result",upload.single('file'),firstrouter.postdata);
app.use("/data",firstrouter.displayimage);



//uploading video directly to the imagekit via Multer
app.post("/result", upload.any(),firstrouter.postdata);






const port=process.env.PORT || 10000;


app.listen(port,()=>{

  db.connection();
  console.log("The server started successfully dear");
    });

   module.exports=imagekit;

   