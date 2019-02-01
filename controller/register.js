const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const passwordHash = require('password-hash');
const mysql = require("../config/mysql_connect");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const tegReplace = require('../teg_replace/teg_replice')


router.get('/', (req, res, next) => {
		res.render('register_page', {
				title: 'Express',
				error: req.flash('error')
		});
});



router.post("/create_new_user", urlencodedParser, function (req, res) {
		if (!req.body) return res.sendStatus(400);

		const arr = [
				tegReplace(req.body.username),
				tegReplace(req.body.surname),
				'',//brthday
				tegReplace(req.body.gender),
				'',//country
				tegReplace(req.body.email),
				'yes',//online
				'images/defolt-avatar.jpg',//profie photo
				passwordHash.generate(req.body.password),//password
				'images/card_defolt.jpg',
				new Date().toISOString().slice(0, 19).replace('T', ' ')
		];

		mysql.query(`SELECT * from users where email = '${tegReplace(req.body.email)}'`, (err, result) => {

				if (err) throw err;
				if (result.length == 0) {

						const sql = "INSERT INTO users (name, surname,birthday,gender,country,email,online,profil_photo,password,card_photo,created_by) VALUES ?";
						const values = [arr];

						mysql.query(sql, [values], (err, result) => {
								if (err) throw err;
								mysql.query(`SELECT * from users where id = '${result.insertId}'`, (err, result) => {
										if (err) throw err;
										req.session.user = result;
										res.redirect('/feed')
								});
						});

				} else {

						req.flash('error', 'This email exists');
						res.redirect('/register');
				}

		});


});


module.exports = router;

