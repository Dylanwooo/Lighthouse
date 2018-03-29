var express = require('express');
var router = express.Router();
let request = require('request');

const API_URL = 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed?';
const API_KEY = 'AIzaSyDJO37Cx7EyABWOXVZWDBou-wau3dIsYCQ';
const webpageTest_API = 'A.42f94b48a17054d80dd1c592a4e2d4d5';
const URL_TO_GET_RESULTS_FOR = 'http://www.4399.com';

const query = [
    'url=' + URL_TO_GET_RESULTS_FOR,
    'key=' + API_KEY,
    'locale=zh',   //中文zh
].join('&');


router.get('/', function(req, res, next) {
  //json化传到前端的数据
  res.json([
      {id: 1, username: "dylanwoo"},
      {id: 2, username: "dylan"}
  ])
  //   request(API_URL+query,function (error, response, body) {
  //       if (!error && response.statusCode == 200) {
  //           body = JSON.parse(body)
  //           res = body
  //       }
  //   });
});

module.exports = router;
