var audio;
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
let recognition = new window.SpeechRecognition();
recognition.maxAlternatives = 1;
recognition.start();
// recognition.continuous = true;
// recognition.interimResults = true;


// recognition.onstart = function() { ... }
// recognition.onresult = function(event) { ... }
// recognition.onerror = function(event) { ... }
// recognition.onend = function() { ... }



recognition.onresult = (event) => {

  // for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
  //   let transcript = event.results[i][0].transcript;
  //   if (event.results[i].isFinal) {
  //     finalTranscript += transcript;
  //   } else {
  //     interimTranscript += transcript;
  //   }
  // }
  if (event.results.length > 0){

    let index = event.results.length - 1;
    let my_comand = event.results[index][0].transcript.toLowerCase()
    // console.log(event.results[index])
    console.log('Я:'+my_comand)

    if (my_comand == 'привет джарвис'){
      console.log('Джарвис: здравствуйте сэр')
    }
    else if (my_comand == 'как ты' || my_comand == 'как ты джарвис'){
      console.log('Джарвис: отлично сэр как вы')
    }

    else if (my_comand == 'отлично' || my_comand == 'хорошо'){
      console.log('Джарвис: Чем могу помоч сэр')
    }

    else if (my_comand == 'включи плеер' || my_comand == 'плеер' ){
      audio = new Audio('/uploads/upl_music/tenca-aghajanyan-fatum-lev-lev-2018.mp3');
      console.log('Джарвис: Плеер включён')
    }

    else if (my_comand == 'включи музыку' || my_comand == 'загрузи музыку' || my_comand == 'музыку' || my_comand ==  'воспроизвести трек' || my_comand ==  'продолжай'){
      audio.play();
      console.log('Джарвис: Наслаждайтесь сэр')
    }

    else if (my_comand == 'выключи музыку' || my_comand == 'выключай' || my_comand ==  'вырубай'|| my_comand ==  'отключай'){
      audio.stop();
      console.log('Джарвис: Музыка отключена')
    }

    else if (my_comand == 'поставь на паузу' || my_comand == 'пауза'){
      audio.pause();
      console.log('Джарвис: Музыка отключена')
    }


    else if (my_comand == 'перезагрузить' ){
      location.reload();
      console.log('Джарвис: Перезагружаю страницу')
    }


  }


  // document.querySelector('body').innerHTML = finalTranscript.toLocaleLowerCase() + '<i style="color:#ddd;">' + interimTranscript + '</>';
}



recognition.onend = function() {
  recognition.start()
};

// Функция stop для Audio:
HTMLAudioElement.prototype.stop = function()
   {
     this.pause();
     this.currentTime = 0.0;
   }
