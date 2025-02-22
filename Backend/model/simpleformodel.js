

const db=require('../dbconnect/databaseconnect')
const dbclass=class simpleform{
    simpleform(){

    }

constructor(title,descrpt,category,url,pdfurls){
this.title=title;
this.descrpt=descrpt;
this.category=category;
this.imageurl=url;
this.pdfurl=pdfurls;

  }


  insertdata(){
    const databse=db.getdb();
    return databse.collection('simpleregistrationform').insertOne(this)
  }

  fetchdata(){
    const database=db.getdb();
    return database.collection('simpleregistrationform').find().toArray();
  }


}
module.exports=dbclass;