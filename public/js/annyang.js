
function sound_play() {
  var audio = new Audio('/uploads/upl_music/tenca-aghajanyan-fatum-lev-lev-2018.mp3');
  audio.play();
  console.log('new_request')
}


$(document).ready(()=>{

  if (annyang) {
    console.log(annyang)
    annyang.setLanguage('ru');
    var commands = {
      'профиль': function() {
        location.href = '/profile'
        // document.write('<h3>Приветствую, я голосовой ассистент!</h3>');
      },
      'новости': function() {
        // document.write('<h3>Мы смогли, пока!</h3>');
        location.href = '/feed'
      },
      'перезагрузить': function() {
        // document.write('<h3>Мы смогли, пока!</h3>');
        console.log('reload')
        location.reload()
      },'рестарт': function() {
        // document.write('<h3>Мы смогли, пока!</h3>');
        console.log('night_mode_togglereload')
        location.reload()
      },
      'выход': function() {
        var myWindow = window.open("", "_self");
        myWindow.document.write("");
        setTimeout (function() {myWindow.close();},1000);
      },
      'включи музыку': function() {
        console.log('play track 1')
        sound_play('/uploads/upl_music/tenca-aghajanyan-fatum-lev-lev-2018.mp3');
      },
      'музыку': function() {
        console.log('play track 1')
        sound_play('/uploads/upl_music/tenca-aghajanyan-fatum-lev-lev-2018.mp3');
      },
      'пой': function() {
        console.log('play track 1')
        sound_play();
      },
      'запросы': function() {

        ($('#requests').hasClass('open')) ?  $('#requests').removeClass('open') :  $('#requests').addClass('open')

      },
      'вниз': function() {
        alert()
        var scroll=$('#scroll');
        scroll.animate({scrollTop: scroll.prop("scrollHeight")});
      },
      'привет *tag': function(tag) {
        console.log(tag)
        if (tag == 'Василий'){
          alert('Здравствуйте сэр')
        }
        // search(tag)
      },
      'поменять тему': function(tag) {
        mode = $('#night_mode_toggle').attr('data-mode');
        if (mode == 'night') {
          $('head').append('<link rel="stylesheet" href="/css/dark_style.css" id="night-mode-css">');
          $('#night_mode_toggle').attr('data-mode', 'day');
          $('#night-mode-text').text('Day mode');
          localStorage["dark"] = 'true'
        } else {

          $('#night-mode-css').remove();
          $('#night_mode_toggle').attr('data-mode', 'night');
          $('#night-mode-text').text('Night mode');
          // localStorage.setItem('dark','false')
          localStorage["dark"] = 'false'
        }
      },
      'отправить запрос': get_following_request,
      'отменить запрос':cancel_follow
    };

    annyang.addCommands(commands);
    annyang.start();
    // SpeechKITT.annyang();
    // SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');
    // SpeechKITT.vroom();
  }

})


function search(tag){
  var value = tag
  $('#wo_repeat_search').text(value)
  $('.dropdown .search-container').addClass('open')
  if (value.length > 1) {
    $.ajax({
      url:'/profile/search',
      type:'post',
      data:{value:value},
      success:function(r){
        r = r.data
        $('.search-dropdown-result').empty().append(r)
      }

    })
  }else{
    $('.search-dropdown-result').empty()
    $('.dropdown search-container').removeClass('open')
  }
}


 get_following_request = function(){

   if($('.cancel_following_btn')){
     console.log('error ')
    return false
  }

  var user_id = $('#user_data').val()
  var my_email = $('#user_email_socket').val()
  $.ajax({
    url:'/follower/new_follow',
    type:'POST',
    data:{'id':user_id,'my_email':my_email},
    success:function(r){
      r = JSON.parse(r)
      console.log()
      $('.follow_btn_block').empty().append(`
							<button type="button" class="btn-active btn btn-default btn-sm cancel_following_btn" 
							id="wo_useract_btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
							viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
							stroke-linecap="round" stroke-linejoin="round">
							<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
							<circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
							<span class="button-text"> Following</span>	</button>
					`)


      $('.online-users').empty().append(r)

    }
  })
}


var cancel_follow = function(){
  var user_id = $('#user_data').val()
  $.ajax({
    url:'/follower/cancel_follow',
    type:'POST',
    data:{'id':user_id},
    success:function(r){
      r= JSON.parse(r);

      $('.follow_btn_block').empty().append(`
										<button  type="button"  class="btn btn-default btn-sm get_following_btn" id="wo_useract_btn">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
										stroke="currentColor" stroke-width="2" stroke-linecap="round"  stroke-linejoin="round">
										<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle>
										<line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>
										</svg><span class="button-text"> Follow</span></button>
							`)

      $('.online-users').empty().append(r)
    }
  })
}