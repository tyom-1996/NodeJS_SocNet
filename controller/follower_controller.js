const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const mysql = require("../config/mysql_connect");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const tegReplace = require('../teg_replace/teg_replice')
const follower_build = require('../module/show_follower_build');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

router.post("/new_follow", urlencodedParser, (req, res) => {
		if (!req.body) return res.sendStatus(400);
		let arr = [
						req.body.id,
						req.session.user[0].id,
						new Date().toISOString().slice(0, 19).replace('T', ' ')
		];

		mysql.query("INSERT INTO followers (user_id,follower_id,created_by) VALUES ?", [[arr]], (err, result) => {
				if (err) throw err;
							follower_build.get_following_obj(req.session.user[0].id,(err,data)=>{
												res.end(JSON.stringify(	follower_build.build(data.following)));
							})
		});
});


router.post('/cancel_follow',urlencodedParser,(req,res) => {
		if (!req.body) return res.sendStatus(400);
		let sql = `DELETE FROM followers WHERE user_id =${req.body.id} AND follower_id = ${	req.session.user[0].id}`
		mysql.query(sql,(err,result) => {
				if (err) throw err;
							follower_build.get_following_obj(req.session.user[0].id,(err,data)=>{
												res.end(JSON.stringify(	follower_build.build(data.following)));
							})
		})
})



router.post('/change_follow_status',urlencodedParser,(req,res) =>{
			if (!req.body) return res.sendStatus(400);
			let sql = `UPDATE followers SET status = '1'
 								 WHERE follower_id= '${req.body.follower_id}' AND user_id = '${req.session.user[0].id}'`
			mysql.query(sql,(err,result) => {
				if (err) throw err;
				res.end(cryptr.encrypt(req.body.follower_id))
			})
})


module.exports = router;