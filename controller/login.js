const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
var passwordHash = require('password-hash');
const mysql = require("../config/mysql_connect");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const tegReplace = require('../teg_replace/teg_replice')


router.get('/', (req, res, next) => {
    let data  = req.session.user  ?  req.session.user  : [];
    if (data.length == 0 ){
        res.render('login_page', {title: 'Express',error: req.flash('error')});
    }else{
        res.redirect('/feed')
    }
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/login')
});


router.post("/login_validate", urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    mysql.query(`SELECT * from users where email = '${tegReplace(req.body.email)}'`, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            if (passwordHash.verify(req.body.password, result[0].password)) {
                req.session.user = result;
                res.redirect('/feed')
            } else {
                req.flash('error', 'Wrong login or password!')
                res.redirect('/login')
            }
        } else {
            req.flash('error', 'Wrong login or password!')
            res.redirect('/login')
        }
    })
});

module.exports = router;
