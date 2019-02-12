



function Gideon(){



  this.audio;
  this.speak;
  this.finalTranscript = '';

  Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
      return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
  })

  this.say = (text)=>{
    console.log('micrafon off')
    this.recognition.stop()
    this.speak = new Audio('https://code.responsivevoice.org/getvoice.php?t='+text+'&tl=ru&sv=g1&vn=&pitch=0.4&rate=0.5&vol=1&gender=male');
    this.speak.id = 'id'
    this.speak.play()
  }


  this.gideon_test = (comands,my_comand) => {

    $("body").keyup((event)=>{
        if(event.keyCode == 13){
            this.command_execution(comands,my_comand);
        }
    });
  }




  this.start = () => {
      window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      this.recognition = new window.SpeechRecognition();
      this.recognition.maxAlternatives = 1;
  //  this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.start()
      console.log(this.recognition)

      this.recognition.onend = ()=>{
        this.interval = setInterval(()=>{
          if (this.speak){
            if(this.speak.playing){ // checks if element is playing right now
              console.log('play')
            }else{
              this.recognition.start()
              console.log('micrafon on')
              clearInterval(this.interval)
            }
          }else{
            this.recognition.start()
            console.log('micrafon on')
            clearInterval(this.interval)
          }
        },100)
      };
  }


  this.SetComands = (comands)=>{
    comands = comands ? comands : {}


    this.defoltComands(comands)

    this.recognition.onresult = (event) => {
          this.interimTranscript = '';
          for (i = event.resultIndex, len = event.results.length; i < len; i++) {
            this.transcript = event.results[i][0].transcript.toLowerCase();
            if (event.results[i].isFinal) {
              this.finalTranscript += '\n<br><br>'+this.transcript;
              this.my_comand = this.transcript;
              console.log('Я:'+this.my_comand  )

              this.command_execution(comands,this.my_comand);

            } else {
              this.interimTranscript += this.transcript;
            }
          }
          // document.querySelector('body').innerHTML = this.finalTranscript.toLocaleLowerCase() + '<hr><i style="color:#ddd;">' + this.interimTranscript + '</>';
          console.log(this.interimTranscript)
    }
  }






  this.command_execution = (comands,my_comand)=>{
      for ( key in comands){

      //-----DBOYNAYA KOMANDA------------------

        this.two_comands_arr = key.split('||')

        if(this.two_comands_arr.length > 1){
            if (this.two_comands_arr.indexOf(my_comand) != -1) {
              this.recognition.stop()
              comands[key]();
            }
        }

      //-----ODINOCHNAYA KOMANDA------------------

        if(my_comand == key){
            this.recognition.stop()
            comands[key]();
        }

      //------many teg

        else{
            if(key.split('*').length > 1){
              this.diff  =  JsDiff.diffChars(key,my_comand);
              this.data = []
              this.res1 = '';
              this.res2 = '';
              this.keyfirstWord = key.replace(/ .*/,'');
              this.mycomandfirstWord = my_comand.replace(/ .*/,'');


              for (j = 0; j <this.diff.length; j++) {
                if (this.diff[j].added != true){
                  this.res1 += this.diff[j].value;
                }
                if (this.diff[j].value != '*'){
                  this.res2 += this.diff[j].value
                }
                if (this.diff[j].added == true){
                  this.data.push(this.diff[j].value)
                }
              }

              if(this.res2 == my_comand && this.mycomandfirstWord == this.keyfirstWord ){
                this.recognition.stop()
                comands[key](this.data);
              }
            }else{
              continue
            }
        }
      }
  }




  this.defoltComands = (comands)=>{

    comands['перезагрузить||обновить||обнови страницу||обновить страницу||перезагрузи страницу'] = ()=> {
      this.say('команда принята обновляю страницу',"Russian Male")
      console.log('команда принята обновляю страницу')
      setTimeout(()=>{
        location.reload()
      },3000)
    }
    comands['открой новую вкладку||открой новое окно'] = ()=>{
      window.open('https://www.google.com/')
      this.say('новая вкладка открыта',"Russian Male")
    }

    comands["кто твой создатель"] = ()=>{
      this.say("Мой создатель, артём арменович")
    }

    comands['сколько будет * * *'] = (data)=>{
      var number_one,number_two,action
      if (data.length == 3){
        if (data[0] == 'пять' || data[0] =='5' ){
          number_one = '5'
        } else if(data[0] == 'два' || data[0] =='2' ){
          number_one = '2'
        }else{
          number_one = data[0]
        }
        if (data[2] == 'пять' || data[2] =='5' ) {
          number_two = '5'
        }else if(data[2] == 'два' || data[2] =='2' ){
          number_two = '2'
        }else{
          number_two = data[2]
        }
        if (data[1] == 'x' || data[1] == 'умножить' || data[1] == '*' || data[1] == 'умножить на '){
          action = '*';
        }else if (data[1] == 'делить' || data[1] == 'разделить' || data[1] == '/'){
          action = '/';
        }else if (data[1] == 'плюс' || data[1] == '+'){
          action = '+';
        }else if (data[1] == 'минус' || data[1] == '-'){
          action = '-';
        }else{
          action = '*';
        }
        try {
          let result = `${number_one} ${action} ${number_two}`.replace(/D/g, '');
          this.say('результат'+eval(result))
        } catch (err) {
          this.say('не могли бы вы говорить более четко')
        }
      }
    }



  }






}

// var voices = [], myvoice = 0;
// if (speechSynthesis.onvoiceschanged !== undefined) {
//   speechSynthesis.onvoiceschanged = function(){voices = window.speechSynthesis.getVoices();};
// }
//
// function voice(text,voice = null){
//     let leng = voice != null ? voice :  "ru-RU";
//     for(i = 0; i < voices.length; i++)if(voices[i].lang == leng )myvoice = i;
//     var utterThis = new SpeechSynthesisUtterance(text);
//     utterThis.voice = voices[myvoice];
//     //pyanaya
//     // utterThis.rate = 0;
//     // utterThis.pitch = 1.5; // при необходимости зададим низкий тон
//     utterThis.rate = 1;
//     utterThis.pitch = 1.1; // при необходимости зададим низкий тон
//     window.speechSynthesis.speak(utterThis);
//
//   // utterance.onend = function() {
//   //   console.log('Команда выполнена')
//   //    recognition.start()
//   // };
//
// }
//