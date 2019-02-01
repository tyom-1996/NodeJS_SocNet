const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const mysql = require("../config/mysql_connect");
const follow_req_example = require('../module/follow_request_example');
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', (req, res, next) => {

					var data  = req.session.user  ?  req.session.user  : [];

					if (data.length == 0 ){
										res.redirect('/login')
					}else{
										res.redirect('/feed')

					}

});

module.exports = router;