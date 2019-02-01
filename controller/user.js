const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const passwordHash = require('password-hash');
const mysql = require("../config/mysql_connect");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const tegReplace = require('../teg_replace/teg_replice')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const follow_req_example = require('../module/follow_request_example');
const follower_build = require('../module/show_follower_build');


router.get('/',(req,res,next)=>{
					var data  = req.session.user  ?  req.session.user  : [];
					if (data.length == 0 ){
										res.redirect('/login')
					}else{
										res.redirect('/feed')
					}
})


router.get('/:id', (req, res, next)=> {
					var sql1,sql2,sql3
					var data  = req.session.user  ?  req.session.user  : [];
					if (data.length == 0 ){
										res.redirect('/login')
					}else{
										if (req.params.id.length > 36){
															res.redirect('/feed')
										}else{
															var guest_id = cryptr.decrypt(req.params.id)
															sql1 = `SELECT * FROM users where id = '${guest_id}'`
															sql2 = `SELECT * FROM followers WHERE user_id = ${guest_id} AND follower_id = ${data[0].id}`;
															sql3 =`SELECT * from users join followers on followers.follower_id = users.id where followers.user_id = '${data[0].id}' and followers.status = 0`;
															mysql.query(sql1,(err,result)=>{
																				if (err) throw err;
																				mysql.query(sql2,(err,result1) => {
																									if (err) throw err;
																									mysql.query(sql3,(err,result2) =>{
																														if (err) throw err;
																																			follower_build.get_following_obj(data[0].id,(err,following_user)=> {

																																								if (err) throw err;
																																								result.length > 0 ? res.render('guest_page', {
																																													guest: result[0],
																																													user: data[0],
																																													follower: result1.length > 0 ? '1' : '0',
																																													socket_em: result[0].email,
																																													request_follow: follow_req_example.res(result2),
																																													request_count: result2.length,
																																													following_user_in_chat_block : follower_build.build(following_user.following),
																																													guest_status : follower_build.UserStatusInGuestPage(result[0].email)
																																								}) : res.redirect('/feed');
																																			})
																									})
																				})
															})
										}
					}
});



module.exports = router;