const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const mysql = require("../config/mysql_connect");
const follow_req_example = require('../module/follow_request_example');
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});
const follower_build = require('../module/show_follower_build');


router.get('/', (req, res, next) => {

				var data  = req.session.user  ?  req.session.user  : [];

				if (data.length == 0 ){

					res.redirect('/login')

				}else{

						mysql.query(`SELECT * from users join followers on followers.follower_id = users.id where followers.user_id = '${data[0].id}' and followers.status = 0`,(err,result) =>{
							if (err) throw err;

											follower_build.get_following_obj(data[0].id,(err,following_user)=>{
																if (err) throw err;
																res.render('feed_page', {
																		user:req.session.user[0],
																		request_follow:follow_req_example.res(result),
																		request_count:result.length,
																					following_user_in_chat_block : follower_build.build(following_user.following)
																});
											})

						})

				}

});




module.exports = router;
