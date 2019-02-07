

var audio;
var speak;
var voice_name = 'гидеон'

var finalTranscript = '';
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
var recognition = new window.SpeechRecognition();
recognition.maxAlternatives = 1;
recognition.start();
console.log(recognition)
// recognition.continuous = true;
recognition.interimResults = true;
//



$(document).ready(function(){
       // // responsiveVoice.speak("команда принята обновляю страницу", "Russian Male", {pitch: 0.8});
  $('body').append('<div class="voice_comand_block"><canvas id="canvas"></canvas></div>');
})

// recognition.onstart = function() { ... }
// recognition.onresult = function(event) { ... }
// recognition.onerror = function(event) { ... }

// recognition.onboundary = function(event) {
//   console.log( 'Здравствуйте сэр ');
// }

//hello


function say(text){
  recognition.stop()
  speak = new Audio('https://code.responsivevoice.org/getvoice.php?t='+text+'&tl=ru&sv=g1&vn=&pitch=0.4&rate=0.5&vol=1&gender=male');
  speak.id = 'id'
  speak.play()
}

recognition.onresult = (event) => {

  let comands = {

      'привет гидеон||привет':()=>{
        console.log('Гидеон: Здравствуйте сэр')
        say('Здравствуйте сэр')


      },'гидеон':()=>{
          console.log('Гидеон: Да сэр')
        // responsiveVoice.speak('Да сэр',"Russian Male", {pitch: 0.8})
        say('Да сэр',"Russian Male")
      },'послушай гидеон||эй гидеон||послушать гидеон':()=>{
          console.log('Гидеон: чего тебе')
      // responsiveVoice.speak('чего тебе',"Russian Male", {pitch: 0.8})
      say('чего тебе',"Russian Male")
      },'гидеон кто ты||кто ты':()=>{
          console.log('Гидеон: я онлайн ассистент ваш верный помощник и воображаемый друг ')
        // responsiveVoice.speak('я онлайн ассистент ваш верный помощник и воображаемый друг',"Russian Male", {pitch: 0.8})
        say('я онлайн ассистент ваш верный помощник и воображаемый друг я онлайн ассистент ваш верный помощник и воображаемый друг')
      },'ты здесь||гидеон ты здесь':()=>{
          console.log('Гидеон: ну конечно я здесь я же так вас люблю')
        // responsiveVoice.speak('ну конечно я здесь',"Russian Male", {pitch: 0.8})
        say('ну конечно я здесь',"Russian Male")
      },'спасибо||гидеон спасибо':()=>{
          console.log('Гидеон: пожалуйста сэр')
        // responsiveVoice.speak('пожалуйста сэр',"Russian Male", {pitch: 0.8})
        say('пожалуйста сэр',"Russian Male")
      },
      'отлично||хорошо':()=>{
          console.log('Гидеон: Чем могу помоч сэр')
          // responsiveVoice.speak('Чем могу помоч сэр',"Russian Male", {pitch: 0.8})
          say('Чем могу помоч сэр',"Russian Male")
      },
      'профиль||открой профиль||открой страницу профиля||покажи мою страницу||перейди на страницу профиля||открой мою страницу||перейти на страницу профиля': function() {
        // responsiveVoice.speak('команда принята,выполняют переход',"Russian Male", {pitch: 0.8})
        say('команда принята,выполняют переход')
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
        say('отлично сэр, чем желаете заняться?')
        // // responsiveVoice.speak('отлично сэр, чем желаете заняться?',"Russian Male", {pitch: 0.8})
        // say('отлично сэр, чем желаете заняться?',"Russian Male", {pitch: 0.8})
      },
      'перезагрузить||обновить||обнови страницу||обновить страницу||перезагрузи страницу': function() {
        // responsiveVoice.speak('команда принята обновляю страницу',"Russian Male", {pitch: 0.8})
        say('команда принята обновляю страницу',"Russian Male")
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

          // responsiveVoice.speak('тема изменена',"Russian Male", {pitch: 0.8})
          say('тема изменена',"Russian Male")

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
        // responsiveVoice.speak('Плеер включён',"Russian Male", {pitch: 0.8})
        say('Плеер включён',"Russian Male")
      },
      'включи музыку||загрузи музыку||музыку||воспроизвести трек||продолжай||play||музыка загрузить':() => {
         (audio) ? (
            audio.play(),
            console.log('Гидеон: Наслаждайтесь сэр'),
               // responsiveVoice.speak('Наслаждайтесь сэр',"Russian Male", {pitch: 0.8})
               say('Наслаждайтесь сэр')
         ) : (
            console.log('Гидеон: Перед прослушиванием музыки загрузите плеер'),
               // responsiveVoice.speak('Перед прослушиванием музыки загрузите плеер',"Russian Male", {pitch: 0.8})
               say('Перед прослушиванием музыки загрузите плеер')
         )
      },
      'поставь на паузу||пауза':() => {
          if (audio) audio.pause();
          // responsiveVoice.speak('музыка переведена в режим паузы',"Russian Male", {pitch: 0.8})
          say('музыка переведена в режим паузы',"Russian Male")
          console.log('музыка переведена в режим паузы')
      },
      'загрузить плеер и включи музыку||загрузи плеер и включи какую-нибудь музыку||включи хорошую музыку':()=>{
        audio = new Audio('/uploads/upl_music/tenca-aghajanyan-fatum-lev-lev-2018.mp3');
        audio.play();
        // responsiveVoice.speak('хорошо включаю надеюсь вам понравится',"Russian Male", {pitch: 0.8})
        say('хорошо включаю надеюсь вам понравится',"Russian Male")

      },
      'открой новую вкладку||открой новое окно':() => {
          window.open('https://www.google.com/')
        // responsiveVoice.speak('новая вкладка открыта',"Russian Male", {pitch: 0.8})
        say('новая вкладка открыта',"Russian Male")
      },
      'гидеон включи камеру||включи камеру||включи камеру гидеон':() => {

        // responsiveVoice.speak('камера включена',"Russian Male", {pitch: 0.8})
        say('камера включена',"Russian Male")
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
        // responsiveVoice.speak('камера выключена',"Russian Male", {pitch: 0.8})
        say('камера выключена',"Russian Male")
      },
      'сделай сэлфи||фото||снимай':() => {
        // responsiveVoice.speak('Снимок готов,выглядишь прекрасно',"Russian Male", {pitch: 0.8})
        say('Снимок готов,выглядишь прекрасно',"Russian Male")
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
        // responsiveVoice.speak('данные отправлены на сервер',"Russian Male", {pitch: 0.8})
        say('данные отправлены на сервер',"Russian Male")
      },
      'открыть консоль||консоль||открой консоль||включи консоль||гидеон открой консоль||гидеон включи консоль':()=>{
        if (!$('.voice_comand_block').hasClass('active_console')){
          $('.voice_comand_block ').addClass('active_console')
          // responsiveVoice.speak('консоль открыта',"Russian Male", {pitch: 0.8})
          say('консоль открыта',"Russian Male")
          console.log('консоль открыта')

        }else{
          // responsiveVoice.speak('будьте внимательнее консоль уже открыто',"Russian Male", {pitch: 0.8})
          say('будьте внимательнее консоль уже открыто',"Russian Male")
          console.log('будьте внимательнее,консоль уже открыто')
        }
      },
      'закрой консоль||уйди с глаз долой ||отключи консоль':()=>{
        if ($('.voice_comand_block').hasClass('active_console')){
          $('.voice_comand_block ').removeClass('active_console')
          console.log('консоль закрыто до новой встречи')
          // responsiveVoice.speak('консоль закрыто,До новой встречи',"Russian Male", {pitch: 0.8})
          say('консоль закрыто,До новой встречи',"Russian Male")
        }else{
          console.log('чтобы что-то закрыт для начала нужно открыть')
          // responsiveVoice.speak('чтобы что-то закрыт для начала нужно открыть',"Russian Male", {pitch:0.9})
          say('чтобы что-то закрыт для начала нужно открыть',"Russian Male")
        }
      },
      'перейти в панель управления||открыть панель управления||панель управления||открой панель управления||гидеон открой панель управления||покажи себя||гидеон покажи себя':()=>{
        if (location.pathname == '/jarvis-comand-panel' ){

          console.log('простите сэр на панели управления уже открыто')
          // responsiveVoice.speak('простите сэр,но панель управления уже открыто',"Russian Male", {pitch: 0.8})
          say('простите сэр,но панель управления уже открыто',"Russian Male")
        }else{
          location.href = '/jarvis-comand-panel'
          console.log('панель управления открыта')
          // responsiveVoice.speak('панель управления,открыта.с возвращением',"Russian Male", {pitch: 0.8})
          say('панель управления,открыта.с возвращением',"Russian Male")
        }

      },
      'пошёл ты к чёрту гидеон||пошёл к чёрту||пошёл ты':()=>{
        console.log('зачем ругаешься начальника')
        // responsiveVoice.speak('сам,пошёл придурок!',"Russian Male", {pitch: 0.8})
        say('сам,пошёл придурок!',"Russian Male")
      },
      'почему у тебя такой голос':()=>{
        console.log('Голосок,голосочек,а у тебя мозгов кусочек');
        // responsiveVoice.speak('Голосок,голосочек,а у тебя мозгов кусочек',"Russian Male", {pitch: 0.8})
        say('Голосок,голосочек,а у тебя мозгов кусочек')
        console.log(speak)
      },
      'а ты шутник':()=>{
          console.log('да я такая')
        // responsiveVoice.speak('да я такой',"Russian Male", {pitch: 0.8})
        say('да я такой')
      },
      'поиск*teg':(teg)=>{
        if (teg.length > 0){
          window.open("http://www.google.com/search?q="+ encodeURIComponent(teg))
          say('найдены следующие результаты по запросу,'+teg)
        }else{
          say('команда не выполнена.пожалуйста,введите ключевые слова для поиска')
        }
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

      command_execution(comands,my_comand);

    } else {
      interimTranscript += transcript;
    }
  }

  // document.querySelector('body').innerHTML = finalTranscript.toLocaleLowerCase() + '<hr><i style="color:#ddd;">' + interimTranscript + '</>';
  console.log(interimTranscript)
}




function command_execution(comands,my_comand){
    for (let key in comands){

    //-----DBOYNAYA KOMANDA------------------

      let two_comands_arr = key.split('||')

      if(two_comands_arr.length > 1){
          if (two_comands_arr.indexOf(my_comand) != -1) {
            recognition.stop()
            comands[key]();
          }
      }

    //-----ODINOCHNAYA KOMANDA------------------

      if(my_comand == key){
          recognition.stop()
          comands[key]();
      }


    //------SEARCH IN GOOGLE

      else{
          let search_comands_arr = key.split('*')

          if(search_comands_arr.length > 1){
              if (my_comand.indexOf(search_comands_arr[0]+' ') != -1){
                let search_query = my_comand.replace(search_comands_arr[0],'');
                recognition.stop()
                comands[key](search_query);
              }
          }
      }

    }
}

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
  get: function(){
    return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
  }
})

recognition.onaudioend = ()=>{
  // console.log(1)
  recognition.stop();
  console.log('micrafon of')


}

recognition.onend = ()=>{


  var interval = setInterval(()=>{
    // console.log(isPlaying('id'))

    if (speak){
      if(speak.playing){ // checks if element is playing right now
        console.log('play')
      }else{
        recognition.start()
        console.log('micrafon on')
        clearInterval(interval)

      }
    }else{
      recognition.start()
      console.log('micrafon on')
      clearInterval(interval)
    }

  },500)

  // setTimeout(()=>{
  //
  //   // console.log(2)
  // },2000)
};

// Функция stop для Audio:
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

