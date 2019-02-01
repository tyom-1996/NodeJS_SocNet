const mysql = require("../config/mysql_connect");

class show_follower{


					get_followers_and_following(myid,callback){
										let sql1 = `select * from users where id in (select user_id  from followers where follower_id = ${myid} )`
										let sql2 = `select * from users where id in (select follower_id  from followers where  user_id = ${myid} )`
										var this_ = this;
										mysql.query(sql1, function(err, following){
															mysql.query(sql2, function(err, followers){
															    (err) ? callback(err,null) :callback(null, {
															    					followers: followers,
																								following: following
																			});
															})
										});
					}

					// get_following(myid, clients, callback){
					// 					let sql = `select * from users where id in (select user_id  from followers where follower_id = ${myid} )`
					// 					var this_ = this;
					// 					mysql.query(sql, function(err, following){
					// 										(err) ? 	callback(err,null) :	callback(null,{
					// 															following:	this_.follow_bild(following,clients)
					// 										});
					// 					});
					// }


					get_following_obj(myid, callback){
										let sql = `select * from users where id in (select user_id  from followers where follower_id = ${myid} )`
										var this_ = this;
										mysql.query(sql, function(err, following){
															(err) ? 	callback(err,null) :	callback(null,{
																				following:	following
															});
										});
					}



					get_followers_obj(myid, callback){
										let sql = `select * from users where id in (select follower_id from followers where user_id  = ${myid} )`
										mysql.query(sql, function(err, following){
														if	(err){
																			callback(err,null,null)
														}else{
																			let sql2 = `select * from users where id ='${myid}'`
																			mysql.query(sql2,(err,my_data)=>{
																								(err) ? callback(err,null,null) : 	callback(null,following,my_data);
																			})
														}
										});
					}

					//
					//
					// get_followers(myid, clients, callback){
					// 					let sql = `select * from users where id in (select follower_id from followers where user_id  = ${myid} )`
					// 					var this_ = this;
					// 					mysql.query(sql, function(err, following){
					// 									 (err) ?	callback(err,null) : 	callback(null,{
					// 															followers: this_.follow_bild(following,clients)
					// 										});
					// 					});
					// }


					UserStatusInGuestPage(email){
										return clients[email] ? 'online' : 'offline'
					}


					build(data){
										let result = '';
										for (let i = 0; i < data.length; i++){
															let user_status = clients[data[i].email] ? 'user_status_active' : 'user_status_inactive'
															result += `
																			<div class="recipient-chat-user chat_user_item" >
																			<input class="type_hiden_inp" type="hidden" data_id = '${data[i].id}'>
																			<div class="user-info"  title="3 hours ago">
																			<div class="pull-right" style="margin-top:8px;">
																			<div class=" ${user_status}"></div>
																			<span class="chat-loading-icon"></span></div>
																			<span class="chat-user-text" id="chat-tab-id"><div class="avatar pull-left">
																			<span class="new-message-alert hidden">0</span><img src="/${data[i].profil_photo}" alt="Profile 
																			Picture"></div>
																			<span class="chat_user_name">${data[i].name} ${data[i].surname}</span></span></div></div>
															`

										}
										return result;
					}






					send_request_build(my_email,clients,data,callback){

										mysql.query(`SELECT * from users WHERE email = '${my_email}'`,(err,user)=> {
															if (err){
																				callback(err,null,null);
															}else{
																				if (user.length > 0){
																							let socket_id = clients[data.guest_mail].socket;
																							let result = '<li class="request_item" style="cursor:pointer;"> <div class="notification-list ">'+
																							'<input class="data_req_us_id" type="hidden" value="'+ user[0].id +'">'+
																							'<div class="notification-user-avatar pull-left">'+
																							'<img src="/'+user[0].profil_photo+'">'+
																							'</div>'+
																							'<div class="notification-text">'+
																							'<span class="main-color">'+
																							'<font style="vertical-align: inherit;">'+
																							'<font style="vertical-align: inherit;">'+user[0].name+'</font>'+
																							'</font>'+
																							'</span>'+
																							'<font style="vertical-align: inherit;">'+
																							'<font style="vertical-align: inherit;">'+
																							' followed  after you'+
																							'</font>'+
																							'</font>'+
																							'</div>'+
																							'<div class="clear"></div>'+
																							'</div>'+
																							'</li>'
																									callback(null,result,user[0].id)
																				}
															}

										})
					}


}


module.exports = new show_follower()