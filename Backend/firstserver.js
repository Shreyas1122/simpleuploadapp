const express=require('express');
const parse=require('body-parser');
const firstrouter=require('./Routes/simplerouter');
const db=require('./dbconnect/databaseconnect');
const multer=require('multer');
const cloudinary=require('cloudinary')
const path = require("path");

const app=express();




    // Configuration
    cloudinary.config({ 
        cloud_name: 'dmas5gmnx', 
        api_key: '232989846571566', 
        api_secret: 'fMBAwb_M4_S_r0QgFLfshC5umwM' // Click 'View API Keys' above to copy your API secret
    });




const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'uploads/');
  },
  filename:function(req,file,cb){
    cb(null,Date.now() + "-" +file.originalname);
  }
})

const upload=multer({storage});

app.use(parse.urlencoded());

app.set('view engine','ejs');
app.set('views',path.join(__dirname, "../Views"));
app.get("/home",firstrouter.application);
app.post("/result",upload.single('file'),firstrouter.postdata);
app.use("/data",firstrouter.displayimage);


const port=process.env.PORT || 10000;


app.listen(port,()=>{
  db.connection();
  console.log("The server started successfully dear");
    });

    module.exports={
     // upload
    }