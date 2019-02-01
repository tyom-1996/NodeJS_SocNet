const mysql = require("../config/mysql_connect");
const Cryptrs = require('cryptr');
const cryptr = new Cryptrs('myTotalySecretKey');
const follower_build = require('./show_follower_build');
var socket_id,my_email;

function get_my_email(socket_id){

  for (let key in clients){
    if (clients[key].socket == socket_id) return  key;
  }

}



module.exports = function (io,clients) {

  io.on('connection',(socket) =>{
    // io.sockets.connected[socket.id].emit("add-message", {content:'hello'});

    socket.on('add-user',(data) => {
      //add new socket id in object
        clients[data.username] = { "socket": socket.id };

         socket_id = socket.id;
         my_email = get_my_email(socket.id);
         console.log(clients)

         //SAY IM ONLY

         if (io.session){

              setTimeout(()=>{
                   follower_build.get_following_obj(io.session.user[0].id,(err,following_user)=>{
                        for (let i = 0; i <following_user.following.length ; i++) {
                             if (clients[following_user.following[i].email]){
                                  io.to(`${clients[following_user.following[i].email].socket}`).emit('i-am-online',{
                                       message:`${io.session.user[0].name } ${io.session.user[0].surname} online`,
                                       id:io.session.user[0].id
                                  });
                             }
                        }
                   })
              },3000)

         }


    });



    //Send and show request

    socket.on('send_request',(data) => {

      if (clients[data.guest_mail]){
        follower_build.send_request_build(data.my_email,clients,data,(err,result,requester_id)=>{
        					console.log(result)
          io.to(`${clients[data.guest_mail].socket}`).emit('add-request',{
            result:result,
            requester_id:requester_id
          });
        })
        // io.sockets.connected[clients[data.guest_mail].socket].emit("add-message", data);
      } else {
        console.log("User does not exist: " + data.guest_mail);
      }
    });





        //Removing the socket on disconnect
        socket.on('disconnect', function() {
          let disconect_email = my_email
          for(var name in clients) {
            if(clients[name].socket === socket.id) {
              delete clients[name];
              break;
            }
          }
          // setTimeout(function(){
          //           if(clients){
          //                if (!clients[disconect_email]){
          //                     console.log(disconect_email,'disconect email')
          //
          //                }
          //           }
          // },5000)
          // io.sockets.emit('i-am-offline',({disconnect_user_id:my_id,message:`${my_id} user ofline` }))
        })

  });

}

