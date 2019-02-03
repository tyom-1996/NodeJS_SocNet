var audio;
var finalTranscript = '';
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
var recognition = new window.SpeechRecognition();
recognition.maxAlternatives = 1;
recognition.start();
console.log(recognition)
// recognition.continuous = true;
recognition.interimResults = true;
//






var name = ''
$(document).ready(function(){
  $('body').append('<div class="voice_comand_block"><canvas id="canvas"></canvas></div>');
})






// recognition.onstart = function() { ... }
// recognition.onresult = function(event) { ... }
// recognition.onerror = function(event) { ... }
// recognition.onaudioend  = function() {
//   console.log(recognition)
//   recognition.stop();
//   console.log('Speech recognition aborted.');
// }

// recognition.onboundary = function(event) {
//   console.log( 'Здравствуйте сэр ');
// }

recognition.onresult = (event) => {

  let comands = {

      'привет джарвис':()=>{
          console.log('Джарвис: Здравствуйте сэр')
        // recognition.stop()

        voice('Здравствуйте сэр')

      },'джарвис':()=>{
          console.log('Джарвис: Да сэр')
        voice('Да сэр')
      },'джарвис кто ты||кто ты такая||кто ты':()=>{
          console.log('Джарвис: я онлайн ассистент ваш верный помощник и воображаемый друг')
        voice('я онлайн ассистент ваш верный помощник и воображаемый друг')
      },'ты здесь||джарвис ты здесь':()=>{
          console.log('Джарвис: ну конечно я здесь я же так вас люблю')
        voice('ну конечно я здесь я же так вас люблю')
      },'спасибо||джарвис спасибо':()=>{
          console.log('Джарвис: пожалуйста сэр')
        voice('пожалуйста сэр')
      },
      'отлично||хорошо':()=>{
          console.log('Джарвис: Чем могу помоч сэр')
          voice('Чем могу помоч сэр')
      },
      'профиль||открой профиль||открой страницу профиля||покажи мою страницу||перейди на страницу профиля||открой мою страницу||перейти на страницу профиля': function() {
        voice('команда принята,выполняют переход')
        console.log('команда принята,выполняют переход')
        setTimeout(()=>{
          location.href = '/profile'
        },2000)
      },
      'новости': function() {
          location.href = '/feed'
      },
      'как ты||как ты джарвис||как дела||как дела джарвис': function() {
        console.log('Джарвис: Лучше не бывает Сэр,жду не дождусь ваших дальнейших указаний')
        voice('Лучше не бывает Сэр,жду не дождусь ваших дальнейших указаний')
      },
      'перезагрузить||обновить||обнови страницу||обновить страницу||перезагрузи страницу': function() {
        voice('команда принята обновляю страницу')
        console.log('команда принята обновляю страницу')
        setTimeout(()=>{
          location.reload()
        },2000)
      },
      'открыть запросы': function() {
          if(!$('#requests').hasClass('open'))   $('#requests').addClass('open');
      },
      'закрыть запросы': function() {
          if($('#requests').hasClass('open'))  $('#requests').removeClass('open');
      },
      'поменяй тему||поменять тему||сменить тему||изменить тему||измени тему||джарвис поменяй тему||джарвис поменять тему||джарвис сменить тему||джарвис изменить тему||джарвис измени тему': function() {

          voice('тема изменена наслаждайтесь')

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
      'включи плеер||плеер||джарвис включи плеер||джарвис загрузи плеер|| загрузи плеер||загрузить плеер':() => {
        audio = new Audio('/uploads/upl_music/tenca-aghajanyan-fatum-lev-lev-2018.mp3');
        console.log('Джарвис: Плеер включён')
        voice('Плеер включён')
      },
      'включи музыку||загрузи музыку||музыку||воспроизвести трек||продолжай||play||музыка загрузить':() => {
         (audio) ? (
            audio.play(),
            console.log('Джарвис: Наслаждайтесь сэр'),
               voice('Наслаждайтесь сэр')
         ) : (
            console.log('Джарвис: Перед прослушиванием музыки загрузите плеер'),
               voice('Перед прослушиванием музыки загрузите плеер')
         )
      },
      'поставь на паузу||пауза':() => {
          if (audio) audio.pause();
          voice('музыка переведена в режим паузы')
          console.log('музыка переведена в режим паузы')
      },
      'загрузить плеер и включи музыку||загрузи плеер и включи какую-нибудь музыку||включи хорошую музыку':()=>{
        audio = new Audio('/uploads/upl_music/tenca-aghajanyan-fatum-lev-lev-2018.mp3');
        audio.play();
        voice('хорошо включаю надеюсь вам понравится')

      },
      'открой новую вкладку||открой новое окно':() => {
          window.open('https://www.google.com/')
          voice('новая вкладка открыта')
      },
      'джарвис включи камеру||включи камеру||включи камеру джарвис':() => {

          voice('камера включена')
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
      'выключи камеру||закрой камеру||выключи камеру джарвис':() => {
        $('#publisher-camera').val('')
        $('#photo-form').hide()
        $('#image-holder').empty()

        $('video').hide()
        $('.snap_shot').hide()
        $('.close_video_bl').hide()
        webcamStream.stop();
        voice('камера выключена')
      },
      'сделай сэлфи||фото||снимай':() => {
        voice('Снимок готов,выглядишь прекрасно,так держать')
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
        voice('данные отправлены на сервер')
      },
      'открыть консоль||консоль||открой консоль||включи консоль||джарвис открой консоль||джарвис включи консоль':()=>{
        if (!$('.voice_comand_block').hasClass('active_console')){
          $('.voice_comand_block ').addClass('active_console')
          voice('консоль открыта')
          console.log('консоль открыта')

        }else{
          voice('будьте внимательнее консоль уже открыто')
          console.log('будьте внимательнее,консоль уже открыто')
        }
      },
      'закрой консоль||уйди с глаз долой ||отключи консоль':()=>{
        if ($('.voice_comand_block').hasClass('active_console')){
          $('.voice_comand_block ').removeClass('active_console')
          console.log('консоль закрыто до новой встречи')
          voice('консоль закрыто,До новой встречи')
        }else{
          console.log('чтобы что-то закрыт для начала нужно открыть')
          voice('чтобы что-то закрыт для начала нужно открыть')
        }
      },
      'перейти в панель управления||открыть панель управления||панель управления||открой панель управления||джарвис открой панель управления||покажи себя||джарвис покажи себя':()=>{
        if (location.pathname == '/jarvis-comand-panel' ){

          console.log('простите сэр на панели управления уже открыто')
          voice('простите сэр,но панель управления уже открыто')
        }else{
          location.href = '/jarvis-comand-panel'
          console.log('панель управления открыта')
          voice('панель управления,открыта.с возвращением')
        }

      },
      'пошла к чёрту джарвис||пошла к чёрту':()=>{
        console.log('зачем ругаешься начальника')
        voice('сам,пошёл придурок!')
      },
      'почему у тебя такой голос':()=>{
        console.log('Голосок,голосочек,а у тебя мозгов кусочек');
        voice('Голосок,голосочек,а у тебя мозгов кусочек')
      },
      'а ты шутница':()=>{
          console.log('да я такая')
          voice('да я такая')
      }
  }



  voice_comand(comands,event);
}






function voice_comand(comands){

  let interimTranscript = '';
  for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
    let transcript = event.results[i][0].transcript.toLowerCase();
    if (event.results[i].isFinal) {
      finalTranscript += '\n<br><br>'+transcript;
      let my_comand = transcript;
      console.log('Я:'+my_comand  )


      for (let key in comands){
          let com_arr = key.split('||')

          //dvoynaya komanda
          if(com_arr.length > 1){

            if (com_arr.indexOf(my_comand) != -1) {
              comands[key]();
            }

          //  odinochnaya komanda
          }else{
            if (my_comand == key) comands[key]();
          }
      }


    } else {
      interimTranscript += transcript;
    }
  }

  // document.querySelector('body').innerHTML = finalTranscript.toLocaleLowerCase() + '<hr><i style="color:#ddd;">' + interimTranscript + '</>';
  console.log(interimTranscript)


}


recognition.onend = function() {
  recognition.start()
};

// Функция stop для Audio:
  HTMLAudioElement.prototype.stop = function(){
     this.pause();
     this.currentTime = 0.0;
  }



  var get_following_request = function(){
      if($('.cancel_following_btn').length >  0){
          console.log('Джарвис:запрос уже отправлен')
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



var voices = [], myvoice = 0;
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = function(){voices = window.speechSynthesis.getVoices();};
}

function voice(text,voice = null){
    let leng = voice != null ? voice :  "ru-RU";
    for(i = 0; i < voices.length; i++)if(voices[i].lang == leng )myvoice = i;
    var utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = voices[myvoice];
    //pyanaya
    // utterThis.rate = 0;
    // utterThis.pitch = 1.5; // при необходимости зададим низкий тон
    utterThis.rate = 1;
    utterThis.pitch = 1.1; // при необходимости зададим низкий тон
    window.speechSynthesis.speak(utterThis);

  // utterance.onend = function() {
  //   console.log('Команда выполнена')
  //    recognition.start()
  // };

}

