
// Code Cited: The WebRTC project https://webrtc.github.io/samples/
'use strict'

// Put variables in global scope to make them available to the browser console.
const audio = document.querySelector('audio')
const video = document.querySelector('video')
const constraints = window.constraints = {
  audio: true,
  video: true
}

function handleSuccess(stream) {
  const audioTracks = stream.getAudioTracks()
  const videoTracks = stream.getVideoTracks()
  console.log('Got stream with constraints:', constraints)
  console.log('Using audio device: ' + audioTracks[0].label)
  console.log(`Using video device: ${videoTracks[0].label}`)
  stream.oninactive = function() {
    console.log('Stream ended')
  }
  window.stream = stream // make variable available to browser console
  audio.srcObject = stream
  video.srcObject = stream
}

function handleError(error) {
  const errorMessage = 'navigator.MediaDevices.getUserMedia error: ' + error.message + ' ' + error.name
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
  errorMsg(`getUserMedia error: ${error.name}`, error)
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector('#errorMsg')
  errorElement.innerHTML += `<p>${msg}</p>`
  if (typeof error !== 'undefined') {
    console.error(error)
  }
}

async function init(e) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream)
    e.target.disabled = true
  } catch (e) {
    handleError(e)
  }
}

function filter() {
  const filter_list = ["none", "blur(3px)", "brightness(60%)", "contrast(30%)",
        "grayscale(1)", "hue-rotate(270deg)", "invert(100%)", "opacity(50%)",
        "saturate(80%)", "sepia(1)"]
  let filteridx = Math.floor(Math.random() * filter_list.length)
  document.getElementById("video_id").style.filter = filter_list[filteridx]
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError)
document.querySelector('#showVideo').addEventListener('click', e => init(e))
