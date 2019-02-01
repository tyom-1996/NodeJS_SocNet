const express = require('express');
const bodyParser = require("body-parser");
const multer  =   require('multer');
const path = require('path')
const app =   express();
const router = express.Router();
const mysql = require("../config/mysql_connect");
const randomstring = require("randomstring");
const fileTyper = require("../module/file-typer");
const urlencodedParser = bodyParser.urlencoded({extended: false});
var base64 = require("../module/ba_64_decode")



app.use(bodyParser.json());


var storage =   multer.diskStorage({
  destination:  (req, file, callback) => {
    var file_path;

    switch(fileTyper.getType(path.extname(file.originalname))) {

      case 'music':
        callback(null, './public/uploads/upl_music');
        // console.log('./upl_music')
        break

      case 'image':
        callback(null, './public/uploads/upl_image');
        // console.log('./upl_image')
        break

      case 'video':
        callback(null, './public/uploads/upl_video');
        // console.log('./public/upl_video')
        break
    }



  },
  filename: (req, file, callback)=> {

    var file_name = Date.now() + randomstring.generate(7)+'-file' +  path.extname(file.originalname)
    callback(null,  file_name);
  }
});

var upload = multer({ storage : storage }).array('my_post',5);


router.post('/new_post',(req,res) => {

  upload(req,res,(err) => {

    if(err)  return res.end("Error uploading file.");

    let upl_files = req.files;
    console.log(upl_files)
    let post_data = {data:[]}
    let sql = `INSERT INTO posts (user_id,post_type,post_data,created_by) VALUES ?`;

    post_data.text = req.body.text;
    post_data.type = upl_files[0] ? fileTyper.getType(path.extname(upl_files[0].originalname)) : 'text'

    for (let i = 0; i < upl_files.length; i++) {
      post_data.data.push(upl_files[i].path)
    }

    mysql.query(sql, [post_insert_value(
      req.session.user[0].id,
      post_data.type,
      JSON.stringify(post_data),
      new Date().toISOString().slice(0, 19).replace('T', ' ')
    )], (err, result) => {
      if (err) throw err;
      res.end('Post saved successfully');
    })

  });
});



router.post('/new_camera_post',(req,res) =>{

  let data_url = req.body.base64;
  let filename = `camera-${req.session.user[0].id}-${new Date().getTime()}`
  let sql = `INSERT INTO posts (user_id,post_type,post_data,created_by) VALUES ?`;

  let post_data = {data:[]}
  post_data.text = req.body.text;
  post_data.data = `/uploads/upl_image/${filename}`;

  base64.writeImage(`./public/uploads/upl_image/${filename}`, data_url,function(){
      mysql.query(sql, [post_insert_value(
            req.session.user[0].id,
          'camera_photo',
            JSON.stringify(post_data),
            new Date().toISOString().slice(0, 19).replace('T', ' ')
      )], (err, result) => {
          if (err) throw err;
          res.end('Image saved successfully')
      })
  });

})

function post_insert_value(user_id,post_type,post_data,date){
  return [[ user_id,post_type,post_data,date]];
}




module.exports = router;

