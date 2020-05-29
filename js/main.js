
// Code Cited: The WebRTC project https://webrtc.github.io/samples/
// Speech API Code Cited: Speech Color Changer Mozilla SpeechRecognition project https://github.com/mdn/web-speech-api/blob/master/speech-color-changer/script.js
'use strict'



/************* SPEECH SECTION *************/

// fun speech times -> experimenting like we're in hs science fair
var keyword = ['blue', 'green', 'yellow','pink','black','coral'] // can be added to
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
    bg.style.backgroundColor = result;
  }
  document.getElementById("heading").textContent = result;
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

// Put variables in global scope to make them available to the browser console.
//const audio = document.querySelector('audio')
const video = document.querySelector('video')
const constraints = window.constraints = {
  //audio: true,
  video: true
}

function handleSuccess(stream) {
  //const audioTracks = stream.getAudioTracks()
  const videoTracks = stream.getVideoTracks()

  console.log('Got stream with constraints:', constraints)
  //console.log('Using audio device: ' + audioTracks[0].label)
  console.log(`Using video device: ${videoTracks[0].label}`)
  stream.oninactive = function() {
    console.log('Stream ended')
  }
  window.stream = stream // make variable available to browser console
  //audio.srcObject = stream
  video.srcObject = stream
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector('#errorMsg')
  errorElement.innerHTML += `<p>${msg}</p>`
  if (typeof error !== 'undefined') {
    console.error(error)
  }
}

function handleError(error) {
  const errorMessage = 'navigator.MediaDevices.getUserMedia error: ' + error.message + ' ' + error.name
  errorMsg(`getUserMedia error: ${error.name}`, error)
  errorMsgElement.innerHTML = errorMessage
  console.log(errorMessage)
  if (error.name === 'ConstraintNotSatisfiedError') {
    const v = constraints.video
    errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`)
  } else if (error.name === 'PermissionDeniedError') {
    errorMsg('Permissions have not been granted to use your camera and ' +
      'microphone, you need to allow the page access to your devices in ' +
      'order for the demo to work.')
  }
}

async function init(e) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
    e.target.disabled = true;
  } catch (e) {
    handleError(e)
  }
}

function filter() {
  const filter_list = ["none", "blur(3px)", "brightness(60%)", "contrast(30%)",
        "grayscale(1)", "hue-rotate(270deg)", "invert(100%)", "opacity(50%)",
        "saturate(80%)", "sepia(1)"]
  let filteridx = Math.floor(Math.random() * filter_list.length)
  document.getElementById("showVideo").style.filter = filter_list[filteridx]
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError)
// document.querySelector('#showVideo').addEventListener('click', e => init(e))
