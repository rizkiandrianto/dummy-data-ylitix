var express=require('express');
var path=require('path');
var request=require('request');
var http= require('http');
var compression=require('compression');
var bodyParser=require('body-parser');
var moment=require('moment');

process.env.NODE_ENV = 'production';

const port=9003;
const app=express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('./'));

app.get('/*',function(req,res){
  var response;
  console.log(req.query);
  //console.log(moment(req.query.date_from).format('dddd, DD MMMM YYYY'))
  switch (req._parsedOriginalUrl.pathname) {
    case '/performance/read':
       response = {
        read: {
          overview: "",
          detail: [
            {
              "2016-01-01": 2345,
              "2016-01-02": 9876,
              "2016-01-03": 5432,
              "2016-01-04": 8765,
              "2016-01-05": 7654
            }
          ]
        }
       };
       if (req.query.compare) {
         response.read.detail[1] = {
           "2016-01-01": 3245,
           "2016-01-02": 8976,
           "2016-01-03": 4532,
           "2016-01-04": 7865,
           "2016-01-05": 6754
         }
       }
       break;
    case '/performance/unique_article':
      response = {
       unique_article: {
         overview: "",
         detail: [
           {
             "2016-01-01": 23,
             "2016-01-02": 98,
             "2016-01-03": 54,
             "2016-01-04": 87,
             "2016-01-05": 76
           }
         ]
       }
      };
      if (req.query.compare) {
        response.unique_article.detail[1] = {
          "2016-01-01": 32,
          "2016-01-02": 89,
          "2016-01-03": 45,
          "2016-01-04": 78,
          "2016-01-05": 67
        }
      }
      break;
    case '/performance/video_play':
      response = {
       video_play: {
         overview: "",
         detail: [
           {
             "2016-01-01": 2345,
             "2016-01-02": 9876,
             "2016-01-03": 5432,
             "2016-01-04": 8765,
             "2016-01-05": 7654
           }
         ]
       }
      };
      if (req.query.compare) {
        response.video_play.detail[1] = {
          "2016-01-01": 3245,
          "2016-01-02": 8976,
          "2016-01-03": 4532,
          "2016-01-04": 7865,
          "2016-01-05": 6754
        }
      }
      break;
    default :
      response = "Welcome To Rizki API";
  }
  var allowedOrigins = ['http://beta.ylitix.com','http://beta.ylitix.com:6969', 'http://localhost:3000'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.json(response)
});

app.listen(port,function(err){
  if(err){
    console.log(err);
  }
});
