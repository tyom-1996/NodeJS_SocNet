const mysql = require("../config/mysql_connect");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
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



				 following_child_block(following){
										let result =  '';

										if (following.length > 0){
															for (let i = 0; i < following.length; i++) {
																				result += `
                    <div class="sidebar-user-data">
                       <div class="sidebar-listed-user-avatar">
                            <a class="avatarc" href="/user/${cryptr.encrypt(following[i].id)}" >
                                <img src="${following[i].profil_photo}">
                            </a>
                            <a href="/user/${cryptr.encrypt(following[i].id)}" >
                             <div class="sidebar-listed-user-name">${following[i].name}</div>
                            </a>
                       </div>
                    </div>
               `
															}
										}

										return result

					}




					followers_child_block(following){
										let result =  '';

										if (following.length > 0){
															for (let i = 0; i < following.length; i++) {
																				result += `
                    <div class="sidebar-user-data">
                       <div class="sidebar-listed-user-avatar">
                            <a class="avatarc" href="/user/${cryptr.encrypt(following[i].id)}" >
                                <img src="${following[i].profil_photo}">
                            </a>
                            <a href="/user/${cryptr.encrypt(following[i].id)}" >
                             <div class="sidebar-listed-user-name">${following[i].name}</div>
                            </a>
                       </div>
                    </div>
               `
															}
										}

										return result
					}



         friends_of_my_friends(my_id,callback){
            let sql = `select * from users where id in (select follower_id from followers where follower_id !=${my_id}
            and user_id  in (select user_id from followers where follower_id  = ${my_id}) )`

            var result = '';

            mysql.query(sql,(err,data)=>{
                  if(err){
                    callback(err,null)
                  }

                  else{

                      for (let i = 0; i < data.length ; i++) {
                         result +=`
                                <div id="wo_sidebar_users">
                                <div class="avatar">
                                  <img src="${data[i].profil_photo}" >
                                </div>
                                <span class="user-popover" data-id="${data[i].id}" >
                                  <a href="/user/${cryptr.encrypt(data[i].id)}"  class="wo_user_link_name">
                                      <span class="user-name" title="Thobias Lobo">${data[i].name}</span>
                                  </a>
                                </span>
                                <div class="wo_user_username_cont"></div>
                                <div class="user-follow-btn">
                                <div class="user-follow-button">
                                <span>
                                   <button type="button"  class="btn btn-default btn-sm wo_follow_btn" id="wo_useract_btn">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                         <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                         <circle cx="8.5" cy="7" r="4"></circle>
                                         <line x1="20" y1="8" x2="20" y2="14"></line>
                                         <line x1="23" y1="11" x2="17" y2="11"></line>
                                      </svg>
                                      <span class="button-text"> Follow</span>
                                   </button>
                                </span>
                                </div>
                                </div>
                                </div>
                         `
                      }
                    callback(null,result);


                  }
            })
         }


}


module.exports = new show_follower()