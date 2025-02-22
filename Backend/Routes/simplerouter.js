
const database=require('../dbconnect/databaseconnect');
const dbclass=require('../model/simpleformodel');
const cloudinary=require('cloudinary');
const fs = require('fs');
const supabase = require('../firstserver');
const { error } = require('console');
const {createClient} = require('@supabase/supabase-js');
const imagekit=require('../imagekit');





var filedata;
const application=(req,res,next)=>{
 res.render('simpleconatctform');
}

const postdata= async(req,res,next)=>{
  var Videoresult;
  
//   console.log("The request data is a s follows ");
//   console.log(req.body);
//   console.log("The file data is a s follows ");
//   console.log(req.file);

//   //upload file to cloudinary 
//   const file =req.file.path;

//   try{
//   var cloudnary;
//     console.log("I am insdie the image vala folder ");
//  cloudnary= await cloudinary.uploader.upload(file,{folder:'practice_forms_images'});
//   console.log(cloudnary);


//   const  abc=new dbclass(req.body.adtitle,req.body.description,req.body.category,cloudnary.secure_url,req.file.mimetype);
//   abc.insertdata();
//   res.redirect("/data");
    
    
//   }catch(error){
//       console.log(error)
//       res.send(error + "\n" )
//     }
    
//  }

//  const uploadvideo= async(req,res,next)=>{
  
// //
 if(req.files[0].mimetype == "video/mp4"){

//   try{
//   console.log(req.files);
//   let Imagekitresult= await imagekit.upload({
//     file: fs.createReadStream(req.files[0].path), // Local video file
//     fileName: req.files[0].filename,
//     folder: "/videos", // Optional: store in a specific folder
//     useUniqueFileName: true, // Ensures no duplicate names
//     tags: ["video", "demo"],
    
//   });

// console.log("Video uploaded successfully:", Imagekitresult);
//       console.log("The url of the video is as follows "+Imagekitresult.url);
//        Videoresult=Imagekitresult.url;
//      // res.send("<h1>File Uploaded Sucess</h1>");
//   }catch(error){
//     console.error("Error uploading video:", error);
//     res.send("<h1>File Uploaded Failed</h1>")

//   }


//upload the image for the server

if( req.files[1].mimetype == "image/jpeg" || req.files[1].mimetype ==  "image/jpg" || req.files[1].mimetype == "image/png"){

  console.log("The request data is a s follows ");
  console.log(req.body);
  console.log("The file data is a s follows ");
  console.log(req.files);

  //upload file to cloudinary 
  const file =req.files[1].path;

  try{
  var cloudnary;
    console.log("I am insdie the image vala folder ");
 cloudnary= await cloudinary.uploader.upload(file,{folder:'practice_forms_images'});
  console.log(cloudnary);


  console.log(Videoresult);

    
    
  }catch(error){
      console.log(error)
      res.send(error + "\n" )
    }
    

}
 if(req.files[2].mimetype == "application/pdf"){
  try{

  const result = await imagekit.upload({
    file: fs.createReadStream(req.files[2].path), // Read the local PDF file
    fileName: req.files[2].filename, // Keep original file name
    folder: "/pdf_files", // Upload to a specific folder in ImageKit
    useUniqueFileName: true, // Avoid name conflicts
    tags: ["pdf", "documents"] // Add optional tags
});


const  abc=new dbclass(req.body.adtitle,req.body.description,req.body.category,cloudnary.secure_url,result.url);
abc.insertdata();
// res.redirect("/data");


for (let i = 0; i < req.files.length; i++) {
  fs.unlink(req.files[i].path, (err) => {
    if (err) {
        console.error("Error deleting file of : "+ i, err);
    } else {
        console.log("Local file deleted successfully.  "+ i);
    }
  });
  
}

res.send(`
  <h1>All Three video, image, and PDF uploaded successfully</h1>
  <a href="/data">Visit Data</a>
`);




  }catch(error){
    console.log(error)
    res.send(error + "\n" )
  }
}
else{
  res.send("<h1>No any File.memetype s matching</h1>");
  console.log(req.files);
}



}
  }


 const displayimage=(req,res,next)=>{
  console.log("I am inside the display page dear");
  var  arrays=[];
  const obj1=new dbclass();
  
  obj1.fetchdata().then((homeobject)=>{
  
    if(homeobject.length !== null){
     console.log("object came with some value ");
     console.log(homeobject);
  

    

     
 
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
  displayimage,
 
  
}