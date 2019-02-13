const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const mysql = require("../config/mysql_connect");
const follow_req_example = require('../module/follow_request_example');
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});
const follower_build = require('../module/show_follower_build');
const posts_build = require('../module/posts_build');



router.get('/', (req, res, next) => {
  res.render('include/jarvis', {
  })
})


router.post('/hucking', (req, res, next) => {
    console.log(res.io)
})

module.exports = router