const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const tegReplace = require('../teg_replace/teg_replice')
const mysql = require("../config/mysql_connect");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const follow_req_example = require('../module/follow_request_example');
const follower_build = require('../module/show_follower_build');

//Open Profile Page

router.get('/', (req, res, next)=> {

    var data  = req.session.user  ?  req.session.user  : [];

    if (data.length == 0 ){
        res.redirect('/login')
    }else{

      let sql  =  `SELECT * from users join followers on followers.follower_id = users.id
                   where followers.user_id = '${data[0].id}' and followers.status = ${0} `;

      mysql.query(sql,(err,result) =>{
        if (err) throw err;
            follower_build.get_following_obj(data[0].id,(err,following_user)=>{
                  res.render('profile_page', {
                         user:data[0],
                         request_follow:follow_req_example.res(result),
                         request_count:result.length,
                         following_user_in_chat_block : follower_build.build(following_user.following)
                  });
           });
      })
    }
});



//SEARCH

router.post('/search',(req,res,next)=>{
        sql = `SELECT * FROM users WHERE name LIKE '%${req.body.value}%' or surname LIKE '%${req.body.value}%'`;
        mysql.query(sql,(err,result)=>{
           if (err) throw err;

           var block = '';

           if (result.length > 0){

              for (let i = 0; i < result.length; i++) {

                   if ( req.session.user[0].id == result[i].id ) continue;

                  block +=`
                      <a class="search_item_a" href='/user/${cryptr.encrypt(result[i].id)}'>
                      <span class="user-popover" data-id="7253" data-type="user">
                         <div class="search-user-avatar pull-left">
                              <img src='/${result[i].profil_photo}' alt="Horizon Fly Profile Picture">
                         </div>
                         <span class="search-user-name">${result[i].surname} ${result[i].name}</span>
                      </span>
                      <div class="user-lastseen">
                      <!--<span class="small-last-seen">'+result[i].day_ago days ago</span>-->
                      </div>
                      </a>`
              }
              res.send({data: block});
           }else{
              res.send({data: ''});
           }

        })



})




module.exports = router;
