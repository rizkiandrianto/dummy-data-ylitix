var express=require('express');
var path=require('path');
var request=require('request');
var http= require('http');
var compression=require('compression');
var bodyParser=require('body-parser');

process.env.NODE_ENV = 'production';

const port=9003;
const app=express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('./'));

app.get('/*',function(req,res){
  var response;
  console.log()
  switch (req._parsedOriginalUrl.pathname) {
    case '/performance/read':
       response = [
          {"Januari" : 12},
          {"Februari" : 6},
          {"Maret" : 4},
          {"April" : 9}
      ];break;
    case '/performance/unique_article':
      response = [
        {"Januari" : 2000},
        {"Februari" : 1670},
        {"Maret" : 1430},
        {"April" : 9000}
      ];break;
    case 'performance/video_play':
      [
        {"Januari" : 12},
        {"Februari" : 6},
        {"Maret" : 4},
        {"April" : 9}
      ];break;
    default :
      response = "Welcome To Rizki API";
  }
  var allowedOrigins = ['http://beta.ylitix.com','http://beta.ylitix.com:6969', 'http://localhost:3000'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.json(response)
});

app.listen(port,function(err){
  if(err){
    console.log(err);
  }
});
