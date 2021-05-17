// const express=require('express');
// const bodyParser=require('body-parser');//middleware
// const mongoose=require('mongoose');//middleware
//
// // cd C:\Users\DELL\Documents\My Web Sites\Youtube Sites\rest-api-playlist
// // "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe"
// // INSTALLING MIDDLEWARES
// // install npm body-parser --save
// // install npm mongoose
//
// // set up express app
// const app=express();
// // connect to mongodb
// mongoose.connect('mongodb://localhost/ninjago');
// mongoose.Promise=global.Promise;//overriding the mongoose default prmoise that is truncated
// // Middle Ware
// app.use(express.static('public'));
// // applying middleware for getting body content
// app.use(bodyParser.json());
// // applying middleware for error detection
// app.use(function(err,req,res,next){
//   res.status(422).send({error:err.message});
// });
// //initialize routes
// app.use('/api',require('./routes/api'));
// //listen for requests
// app.listen(process.env.port||4000,function(){
//   console.log('Now listening for requests');
// });
const express = require("express");
const routes=require('./routes/api')
const bodyParser=require('body-parser')
const mongoose =require('mongoose');

//set up express app
const app=express();

//
//mongoose.connect('mongodb://localhost/ninjago')
//

//connect to mongodb
mongoose.connect('mongodb://localhost/ecommerce')
mongoose.Promise=global.Promise

app.use(express.static('public'));

//app.use(bodyParser.json());
app.use(express.json());
app.use('/api',routes);

//error handling middleware
app.use(function(err,req,res,next){
res.status(422).send({error:err.message});
});

//listen for requests
app.listen(process.env.port||4000,function(){
console.log('now listening for requests');
});
