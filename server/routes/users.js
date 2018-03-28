var express = require('express');
var router = express.Router();

/* GET users listing. */
//router.options('*', cors());
router.get('/', function(req, res, next) {
  //json化传到前端的数据
  res.json([
      {id: 1, username: "dylanwoo"},
      {id: 2, username: "dylan"}
  ])
});

module.exports = router;
