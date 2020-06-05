
// Code Cited: The WebRTC project https://webrtc.github.io/samples/
// Speech API Code Cited: Speech Color Changer Mozilla SpeechRecognition project https://github.com/mdn/web-speech-api/blob/master/speech-color-changer/script.js
// Basic visual progress bar: https://www.w3schools.com/howto/howto_js_progressbar.asp
'use strict'

/************* TIMER SECTION *************/

let recordingIndicator = false;
const questions = ["who r u?", "owo thats neat uh who am i am i human?", "y r u here? wut brought u hr?", "do u like the internet?", "r u hooman? hw do i kno ur not lying?", "tell me smthing noone else knos!", " r u ok w/ me using ur data hehe", "r u good or bad?", "tell me more! >0<", "wuts ur zoooooom name lol", "ok ok u have a shovel the handle breaks and u replace it u use it for a few more yrs its a good ol shovel the scoop breaks u replace it is it still the same shovel?", "wut u gonna do after covid??? go see someone?? ;PPP lul", "r u the same person u were ystrday?", "expln covid to ur past self---- r u better off now than u wer ysterday?"];

const popups = [popUp1, popUp2, popUp3, popUp4, popUp5, popUp6, popUp7, popUp8, popUp9, popUp10, popUp11, popUp12, popUp13];

let i = 0;
function timer() {
  if (i == 0) {
    i = 1;
    const elem = document.getElementById("time-bar");
    const question = document.getElementById("questionsWarningText");
    question.innerHTML = questions[0];
    let currentQ = questions.slice(1, questions.length);
    let displayPop = popups.slice(0, popups.length);
    let width = 90;
    let id = setInterval (frame, 100);
    setTimeout(popUp1(), 3000)
    function frame() {
      if (!recordingIndicator || currentQ.length <= 1) {
        clearInterval(id);
        i = 0;
        width = 90;
        elem.style.width = width + "%";
        if (currentQ.length <= 1) {
          question.innerHTML = "Interview is complete. Thank you for your time. You are still being recorded."
        }
        else {
          question.innerHTML = "Nice. We've put that into our records. Keep going."
        }
      }
      else if (width <= 0 && recordingIndicator) {
        //get a popup to show
        // check current innerHTML to see if its the single ladies trigger lul
        if (question.innerHTML == "wut u gonna do after covid??? go see someone?? ;PPP lul") {
          popUp14();
        }
        else {
          let adNum = Math.floor(Math.random() * (displayPop.length));
          console.log("should see popup now");
          displayPop[adNum]();
          displayPop.splice(adNum, 1);
        }
        width = 90;
        let qIndex = Math.floor(Math.random() * (currentQ.length));
        question.innerHTML = currentQ[qIndex];
        currentQ.splice(qIndex, 1);
      }
      else {
        width--;
        elem.style.width = width + "%";
      }
    }
  }
}

/************* POPUP SECTION *************/

function popUp1() {
  alert("Enjoy your conversation! XD");
}

function popUp2(){
  alert("Where are you.");
}

function popUp3(){
  alert("You're in our records now.");
}

function popUp4(){
  alert("This information is being collected.");
}

function popUp5(){
  alert("Don't think we don't know what you did");
}

function popUp6(){
  alert("Big brother is watching.");
}

function popUp7(){
  alert("Your identity is our property.");
}

function popUp8(){
  alert("Tell us your favorite color.");
}

function popUp9(){
  alert("The surveillance state is your friend.");
}

function popUp10(){
  alert("We're watching you");
}

function popUp11(){
  alert("This information will be used against you.");
}

function popUp12(){
  alert("Things will not get better.");
}

function popUp13(){
  alert("The illuminati controls the world order");
}

function popUp14(){
  alert("Single ladies in your area are lonely and looking to talk!XXXX");
}

window.onload = prompt("ENTER YOUR SSN.", "");

/************* SPEECH SECTION *************/

// fun speech times -> experimenting like we're in hs science fair
var keyword = ['blue', 'green', 'yellow','pink','black','coral','orange','brown','white','red','silver','gold','beige'] // can be added to
var grammar = '#JSGF V1.0; grammar keyword; public <keyword> = ' + keyword.join(' | ') + ' ;'
var count = 0;
var containsKey = false;


var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

//var grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
console.log('Is this at all working???');
recognition.start();
console.log('ah hi!')
var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var height = document.getElementById("showVideo").height;
recognition.onresult = function(event) {
  var result = event.results[count][0].transcript;
  console.log('Received: ' + result + '.' );
  console.log('Confidence: ' + event.results[count][0].confidence);
  count++;
  // check to see if a keyword is in the phrase
  /* WHOEVER MAKES THE SPEECH BASED CHANGES: the following few lines set variable
   * containsKey to true if a keyword is in the detected speech.
   * You can use as is or return the keyword or what not depending on how we
   * eventually decide to handle this.
   */
  containsKey = false;
  result.split(' ', '.');
  containsKey = hasKey(keyword, result);
  console.log('Contains a keyword? ' + containsKey);
  if (containsKey){
    document.getElementById("header").style.backgroundColor = result;
    document.body.style.backgroundColor = result;
  }
  document.getElementById("heading").textContent = result + "?";
  console.log( "blur(" + (100 - Math.round(event.results[count-1][0].confidence*100)) + "px)");
  document.getElementById("showVideo").style.filter = "blur(" + (100 - Math.round(event.results[count-1][0].confidence*100)) + "px)";
}

recognition.onspeechend = function() {
  recognition.stop();
}

function hasKey(arr, arr2) {
  let i;
  for (i = 0; i < arr.length; i++) {
    if(arr2.indexOf(arr[i]) > -1){
      return true;
    }
  }
  return false;
}



/************* WEB AND VIDEO SECTION *************/

let mediaRecorder
let recordedBlobs

const recordedVideo = document.querySelector('video#recorded')
const recordButton = document.querySelector('button#record')

recordButton.addEventListener('click', () => {
  if (recordButton.textContent === 'Start Recording') {
    startRecording()
    recordingIndicator = !recordingIndicator
    timer()
  } else {
    stopRecording()
    recordingIndicator = !recordingIndicator
    const question = document.getElementById("questionsWarningText");
    question.innerHTML = "You will be recorded."
    recordButton.textContent = 'Start Recording'
    playButton.disabled = false
    downloadButton.disabled = false
  }
})

const playButton = document.querySelector('button#play')
playButton.addEventListener('click', () => {
  const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'})
  recordedVideo.src = null
  recordedVideo.srcObject = null
  recordedVideo.src = window.URL.createObjectURL(superBuffer)
  recordedVideo.controls = true
  recordedVideo.play()
})

const downloadButton = document.querySelector('button#download')
downloadButton.addEventListener('click', () => {
  const blob = new Blob(recordedBlobs, {type: 'video/webm'})
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = 'test.webm'
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }, 100)
})

function handleDataAvailable(event) {
  console.log('handleDataAvailable', event)
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data)
  }
}

function startRecording() {
  recordedBlobs = []
  let options = {mimeType: 'video/webm;codecs=vp9,opus'}
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    console.error(`${options.mimeType} is not supported`)
    options = {mimeType: 'video/webm;codecs=vp8,opus'}
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.error(`${options.mimeType} is not supported`)
      options = {mimeType: 'video/webm'}
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not supported`)
        options = {mimeType: ''}
      }
    }
  }

  try {
    mediaRecorder = new MediaRecorder(window.stream, options)
  } catch (e) {
    console.error('Exception while creating MediaRecorder:', e)
    errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`
    return
  }

  console.log('Created MediaRecorder', mediaRecorder, 'with options', options)
  recordButton.textContent = 'Stop Recording'
  playButton.disabled = true
  downloadButton.disabled = true
  mediaRecorder.onstop = (event) => {
    console.log('Recorder stopped: ', event)
    console.log('Recorded Blobs: ', recordedBlobs)
  }
  mediaRecorder.ondataavailable = handleDataAvailable
  mediaRecorder.start()
  console.log('MediaRecorder started', mediaRecorder)
}

function stopRecording() {
  mediaRecorder.stop()
}

function handleSuccess(stream) {
  recordButton.disabled = false
  console.log('getUserMedia() got stream:', stream)
  window.stream = stream

  const showVVideo = document.querySelector('video#showVideo')
  showVVideo.srcObject = stream
}

async function init(constraints) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream)
  } catch (e) {
    console.error('navigator.getUserMedia error:', e)
  }
}

function filter() {
  const filter_list = ["none", "blur(3px)", "brightness(60%)", "contrast(30%)",
        "grayscale(1)", "hue-rotate(270deg)", "invert(100%)", "opacity(50%)",
        "saturate(80%)", "sepia(1)"]
  let filteridx = Math.floor(Math.random() * filter_list.length)
  document.getElementById("showVideo").style.filter = filter_list[filteridx]
}

document.querySelector('button#start').addEventListener('click', async () => {
  const hasEchoCancellation = document.querySelector('#echoCancellation').checked
  const constraints = {
    audio: {
      echoCancellation: {exact: hasEchoCancellation}
    },
    video: {
      width: 1280, height: 720
    }
  }
  console.log('Using media constraints:', constraints)
  await init(constraints)
  const question = document.getElementById("questionsWarningText");
  question.innerHTML = "You will be recorded."
})

/********INTERACTION UX SECION************/

function buttonStart() {
  // var text = document.getElementById("questionsWarningText"); 
  // text.style.display = "none";
  start.style.display = "none";
  if(record.style.display == "none"){
    record.style.display = "inline";
  }

  record.addEventListener('click', function(){
    if(play.style.display == "none"){
      play.style.display = "inline";
    }
    if(download.style.display == "none"){
      download.style.display = "inline";
    }
  }, false)
  
}
