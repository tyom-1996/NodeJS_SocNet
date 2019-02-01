const mysql = require("../config/mysql_connect");


class posts_build {
					get_all_post(user_id,callback){
										if (user_id){
															mysql.query(`select * from posts where user_id = '${user_id}'`,(err,posts) => {
																				(err) ? callback(err,null) : callback(null,posts)
															})
										}
					}


					get_posts_follower_followers_count(user_id,callback){

										let sql1= `SELECT COUNT(*) from users where id in( select follower_id from followers where user_id = '${user_id}' )`; //followers count
										let sql2= `SELECT COUNT(*) from users where id in( select user_id from followers where  follower_id = '${user_id}' )`; //following count
										let sql3= `SELECT COUNT(*) from posts where 	user_id = '${user_id}'`; //posts count

										mysql.query(sql1,(err,followers_count)=>{
															mysql.query(sql2,(err,following_count)=>{
																				mysql.query(sql3,(err,posts_count)=>{
																									callback(null,followers_count,following_count,posts_count)
																				})
															})
										})
					}













}

module.exports = new posts_build();