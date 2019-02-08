



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
    // recognition.onaudioend = ()=>{
    //     console.log(1)
    //     recognition.stop();
    //     console.log('micrafon of')
    // }
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
            this.search_comands_arr = key.split('*')

            if(this.search_comands_arr.length > 1){

                if (my_comand.indexOf(this.search_comands_arr[0]+' ') != -1){
                  this.search_query = my_comand.replace(this.search_comands_arr[0],'');
                  this.recognition.stop()
                  comands[key](this.search_query);
                }


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