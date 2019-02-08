

  var gideon = new Gideon('Artyom');
  var audio;

  gideon.start();

  // gideon.say('кто ты ');


  let comands = {

      'привет гидеон||привет':()=>{

        console.log('Гидеон: Здравствуйте сэр')
        gideon.say('Здравствуйте сэр')

      },'гидеон':()=>{

          console.log('Гидеон: Да сэр')
          gideon.say('Да сэр',"Russian Male")

      },'послушай гидеон||эй гидеон||послушать гидеон':()=>{

          console.log('Гидеон: чего тебе')
        gideon.say('чего тебе',"Russian Male")

      },'гидеон кто ты||кто ты':()=>{

          console.log('Гидеон: я онлайн ассистент ваш верный помощник и воображаемый друг ')
          gideon.say('я онлайн ассистент ваш верный помощник и воображаемый друг')

      },'ты здесь||гидеон ты здесь':()=>{

          console.log('Гидеон: ну конечно я здесь я же так вас люблю')
          gideon.say('ну конечно я здесь',"Russian Male")

      },'спасибо||гидеон спасибо':()=>{

          console.log('Гидеон: пожалуйста сэр')
          gideon.say('пожалуйста сэр',"Russian Male")

      },
      'отлично||хорошо':()=>{

          console.log('Гидеон: Чем могу помоч сэр')
          gideon.say('Чем могу помоч сэр',"Russian Male")

      },
      'профиль||открой профиль||открой страницу профиля||покажи мою страницу||перейди на страницу профиля||открой мою страницу||перейти на страницу профиля': function() {
          gideon.say('команда принята,выполняют переход')
          console.log('команда принята,выполняют переход')
          setTimeout(()=>{
            location.href = '/profile'
          },3000)
      },
      'новости': function() {
          location.href = '/feed'
      },
      'как ты||как ты гидеон||как дела||как дела гидеон': function() {
          console.log('Гидеон:отлично сэр, чем желаете заняться')
          gideon.say('отлично сэр, чем желаете заняться?')
          // gideon.say('отлично сэр, чем желаете заняться?',"Russian Male", {pitch: 0.8})
      },
      'перезагрузить||обновить||обнови страницу||обновить страницу||перезагрузи страницу': function() {
          gideon.say('команда принята обновляю страницу',"Russian Male")
          console.log('команда принята обновляю страницу')
          setTimeout(()=>{
            location.reload()
          },3000)
      },
      'открыть запросы': function() {
          if(!$('#requests').hasClass('open'))   $('#requests').addClass('open');
      },
      'закрыть запросы': function() {
          if($('#requests').hasClass('open'))  $('#requests').removeClass('open');
      },
      'поменяй тему||поменять тему||сменить тему||изменить тему||измени тему||гидеон поменяй тему||гидеон поменять тему||гидеон сменить тему||гидеон изменить тему||гидеон измени тему': function() {

            gideon.say('тема изменена',"Russian Male")

          mode = $('#night_mode_toggle').attr('data-mode');
          if ( mode == 'night' ) {
              $('head').append('<link rel="stylesheet" href="/css/dark_style.css" id="night-mode-css">');
              $('#night_mode_toggle').attr('data-mode', 'day');
              $('#night-mode-text').text('Day mode');
              localStorage["dark"] = 'true'
          }else {
              $('#night-mode-css').remove();
              $('#night_mode_toggle').attr('data-mode', 'night');
              $('#night-mode-text').text('Night mode');
              localStorage["dark"] = 'false'
          }
      },
      'отправить запрос||отправь запрос': get_following_request,
      'отменить запрос||отмени запрос':cancel_follow,
      'включи плеер||плеер||гидеон включи плеер||гидеон загрузи плеер|| загрузи плеер||загрузить плеер':() => {
        audio = new Audio('/uploads/upl_music/tenca-aghajanyan-fatum-lev-lev-2018.mp3');
        console.log('Гидеон: Плеер включён')
          gideon.say('Плеер включён',"Russian Male")
      },
      'включи музыку||загрузи музыку||музыку||воспроизвести трек||продолжай||play||музыка загрузить':() => {
         (audio) ? (
            audio.play(),
            console.log('Гидеон: Наслаждайтесь сэр'),
                 gideon.say('Наслаждайтесь сэр')
         ) : (
            console.log('Гидеон: Перед прослушиванием музыки загрузите плеер'),
                 gideon.say('Перед прослушиванием музыки загрузите плеер')
         )
      },
      'поставь на паузу||пауза':() => {
          if (audio) audio.pause();
            gideon.say('музыка переведена в режим паузы',"Russian Male")
          console.log('музыка переведена в режим паузы')
      },
      'загрузить плеер и включи музыку||загрузи плеер и включи какую-нибудь музыку||включи хорошую музыку':()=>{
        audio = new Audio('/uploads/upl_music/tenca-aghajanyan-fatum-lev-lev-2018.mp3');
        audio.play();
          gideon.say('хорошо включаю надеюсь вам понравится',"Russian Male")

      },
      'открой новую вкладку||открой новое окно':() => {
          window.open('https://www.google.com/')
          gideon.say('новая вкладка открыта',"Russian Male")
      },
      'гидеон включи камеру||включи камеру||включи камеру гидеон':() => {

          gideon.say('камера включена',"Russian Male")
        console.log('камера включена')

          $('.publisher-box-footer').show()
          $('body').addClass('pub-focus')

        if (navigator.getUserMedia) {
          navigator.getUserMedia ({
               video: true,
               audio: false
             },
             function(stream) {
               // $('#video_bl img').remove()
               $('video').show()
               $('.snap_shot').css('display','flex')
               $('.close_video_bl').css('display','flex')
               video = document.querySelector('video');
               video.srcObject=stream;
               webcamStream = stream.getTracks()[0];
             },
             function(err) {
               console.log(`The following error occured: ${err}`);
             });
        }
        else {
          console.log('getUserMedia not supported');
        }
      },
      'выключи камеру||закрой камеру||выключи камеру гидеон':() => {
        $('#publisher-camera').val('')
        $('#photo-form').hide()
        $('#image-holder').empty()

        $('video').hide()
        $('.snap_shot').hide()
        $('.close_video_bl').hide()
        webcamStream.stop();
          gideon.say('камера выключена',"Russian Male")
      },
      'сделай сэлфи||фото||снимай':() => {
          gideon.say('Снимок готов,выглядишь прекрасно',"Russian Male")
        console.log('выглядишь прекрасно так держать')
          ctx.drawImage(video, 0,0,400,300);
          var base64dataUrl = canvas.toDataURL('image/png');
          var image = new Image();
          image.src = canvas.toDataURL("image/png");
          image.id = 'camera_img'
          $('#publisher-camera').val(base64dataUrl);
          $('#image-holder').empty().append(image)
          $('#photo-form').show()
          $("#photo-form input").val(1 + ' photo(s) selected').css('color','#555');
          $("#publisher-photos").val('');
          $('#video').hide()
          $('.snap_shot').hide()
          $('.close_video_bl').hide()
          $("#music-form").slideUp(200);
          $("#publisher-music").val('');
          $("#publisher-video").val('');
          $("#video-form").slideUp(200);
      },
      'отправь картинку на север||отправить картинку на сервер||отправить данные на сервер||отправь данные на сервер||отправить на сервер':()=>{
          $('#publisher-button').click()
          gideon.say('данные отправлены на сервер',"Russian Male")
      },
      'открыть консоль||консоль||открой консоль||включи консоль||гидеон открой консоль||гидеон включи консоль':()=>{
        if (!$('.voice_comand_block').hasClass('active_console')){
          $('.voice_comand_block ').addClass('active_console')
            gideon.say('консоль открыта',"Russian Male")
          console.log('консоль открыта')

        }else{
            gideon.say('будьте внимательнее консоль уже открыто',"Russian Male")
          console.log('будьте внимательнее,консоль уже открыто')
        }
      },
      'закрой консоль||уйди с глаз долой ||отключи консоль':()=>{
        if ($('.voice_comand_block').hasClass('active_console')){
          $('.voice_comand_block ').removeClass('active_console')
          console.log('консоль закрыто до новой встречи')
            gideon.say('консоль закрыто,До новой встречи',"Russian Male")
        }else{
          console.log('чтобы что-то закрыт для начала нужно открыть')
            gideon.say('чтобы что-то закрыт для начала нужно открыть',"Russian Male")
        }
      },
      'перейти в панель управления||открыть панель управления||панель управления||открой панель управления||гидеон открой панель управления||покажи себя||гидеон покажи себя':()=>{
        if (location.pathname == '/jarvis-comand-panel' ){

          console.log('простите сэр на панели управления уже открыто')
            gideon.say('простите сэр,но панель управления уже открыто',"Russian Male")
        }else{
          location.href = '/jarvis-comand-panel'
          console.log('панель управления открыта')
            gideon.say('панель управления,открыта.с возвращением',"Russian Male")
        }

      },
      'пошёл ты к чёрту гидеон||пошёл к чёрту||пошёл ты':()=>{
        console.log('зачем ругаешься начальника')
          gideon.say('сам,пошёл придурок!',"Russian Male")
      },
      'почему у тебя такой голос':()=>{
        console.log('Голосок,голосочек,а у тебя мозгов кусочек');
          gideon.say('Голосок,голосочек,а у тебя мозгов кусочек')
      },
      'а ты шутник':()=>{
          console.log('да я такая')
          gideon.say('да я такой')
      },
      'поиск*':(teg)=>{
        if (teg.length > 0){
          window.open("http://www.google.com/search?q="+ encodeURIComponent(teg))
          gideon.say('найдены следующие результаты по запросу,'+teg)
        }else{
          gideon.say('команда не выполнена.пожалуйста,введите ключевые слова для поиска')
        }
      },
      'спокойной ночи||гидеон спокойной ночи||спокойной ночи гидеон':()=>{
        gideon.say('спокойной ночи сэр')
      }
  }



  gideon.gideon_test(comands,'поиск я из армении');






  // gideon.SetComands(comands)



// var name = ''
// $(document).ready(function(){
  //   $('body').append('<div class="voice_comand_block"><canvas id="canvas"></canvas></div>');
// })
//
// // recognition.onstart = function() { ... }
// // recognition.onresult = function(event) { ... }
// // recognition.onerror = function(event) { ... }
//
// // recognition.onboundary = function(event) {
// //   console.log( 'Здравствуйте сэр ');
// // }
//
//





  HTMLAudioElement.prototype.stop = function(){
     this.pause();
     this.currentTime = 0.0;
  }



    var get_following_request = function(){
      if($('.cancel_following_btn').length >  0){
          console.log('Гидеон:запрос уже отправлен')
          return false
      }
      let user_id = $('#user_data').val()
      let my_email = $('#user_email_socket').val()
      $.ajax({
          url:'/follower/new_follow',
          type:'POST',
          data:{'id':user_id,'my_email':my_email},
          success:function(r){
              r = JSON.parse(r)
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


