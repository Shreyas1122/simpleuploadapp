const mong=require('mongodb');
//const { error } = require('../Controllers/error');
const mo=mong.MongoClient;

const  MONGO_URL="mongodb+srv://shreyas:shreyas@shreyas.8rxrw.mongodb.net/?retryWrites=true&w=majority&appName=shreyas";

var db;

function connection(){
  mo.connect(MONGO_URL).then(client=>{
    db=client.db('Practiceforms');
    console.log("Connected to the Mongo Db Suceessfully");
 
  }).catch(err=>{
    console.log("error occured while connecting to the MongoDB ");
    console.log(err);
  });

}

function getdb(){
  if(db == null){
    throw new Error("Mongo NOt Coonected ")
  }
  else{
    return db;
  }
}
  


module.exports={
  connection,
  getdb
}