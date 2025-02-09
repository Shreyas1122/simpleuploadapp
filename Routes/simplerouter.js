
const database=require('../dbconnect/databaseconnect');
const dbclass=require('../model/simpleformodel');
const cloudinary=require('cloudinary');


var filedata;
const application=(req,res,next)=>{
 res.render('simpleconatctform');
}

const postdata= async(req,res,next)=>{
  console.log("The request data is a s follows ");
  console.log(req.body);
  console.log("The file data is a s follows ");
  console.log(req.file);

  //upload file to cloudinary 
  const file =req.file.path;
  const cloudnary= await cloudinary.uploader.upload(file,{folder:'practice_forms_images'});
  console.log(cloudnary);
  
const  abc=new dbclass(req.body.adtitle,req.body.description,req.body.category,cloudnary.secure_url,req.file.mimetype);
abc.insertdata();
res.redirect("/data");
  //res.send("<h1>Data Inserty Successfully</h1>");
 }

 const displayimage=(req,res,next)=>{
  console.log("I am inside the display page dear");
  var  arrays=[];
  const obj1=new dbclass();
  
  obj1.fetchdata().then((homeobject)=>{
  
    if(homeobject.length !== null){
     console.log("object came with some value ");
     //console.log(homeobject);
  

    

     
 
  objects={
    arrays:homeobject
  }
    res.render('displaypage',objects);}
    else{
     console.log("object came is null ");
     console.log(homeobject);
      res.send("<h1>No Any Data Found ! </h1>")   }
 
    });
 }

module.exports={
  application,
  postdata,
  displayimage
  
}