function req_example(){

  this.res = function(data){
    let result = '';

    // for(let key in data)
    for (let i = 0; i < data.length ; i++) {

       result += '<li class="request_item" style="cursor:pointer;"> <div class="notification-list ">'+
          '<input class="data_req_us_id" type="hidden"  value="'+data[i].follower_id +'">'+
         '<div class="notification-user-avatar pull-left">'+
         '<img src="/'+data[i].profil_photo+'">'+
         '</div>'+
         '<div class="notification-text">'+
         '<span class="main-color">'+
         '<font style="vertical-align: inherit;">'+
         '<font style="vertical-align: inherit;">'+data[i].name+'</font>'+
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
    }

    return result;


  }
}



 module.exports = new req_example()