const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');
const books = ["pices","harry potter","header"];
////////////////////////////////////////mongoose\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
mongoose.connect('mongodb://localhost:27017/pusatakDB', {useNewUrlParser: true,useUnifiedTopology: true});
const loginSchema = new mongoose.Schema(
  { name:String,
    email:String,
    password:String,
    genere:String
  }
);
const loginData = new mongoose.model("loginData",loginSchema);
/////////////////////////////////home route\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.route("/")
.get(function(req,res){
  res.render("index",{
    suggestion:books
  });
});
/////////////\\\\\\\\\\\sigin route\\\\\\\\\\\\\\\//////////////
app.route("/signin")
.get(function(req,res){
  res.render("signin");
})
.post(function(req,res){
  let email = req.body.email;
  let password= req.body.password;
  loginData.find({email:email,password:password},function(err,result){
    if (result.email==email) {
      res.redirect("/")
    }
    else {
      res.
      Alert("no account exists");
    }
  });
});
///////////////////////////signup route\\\\\\\\\\\\\\\\\\\\\\
app.route("/signup")
  .post(function(req,res){
    let name = req.body.name;
    let email = req.body.email;
    let password  = req.body.password;
    let genere = req.body.genere;
    loginData.find({email:email},function(err,result){
      if (result) {
      res.render()
      }
      else{
        var data = new loginData({
           name:name,
           email:email,
           password:password,
           genere:genere
         });
         data.save();
      }
    })
  });
app.listen("3000",function(req,res){
console.log("listening to port 3000");
})
