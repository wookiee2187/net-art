/* Glitch JS file for glitching video
Authors: Catie Medvid, Cherry Ying, Hailey Qu, Neha Lingareddy
Date updated: June 5th 2020
*/

var t = 0;
var glitch = 0

start.addEventListener('click', function glitch() {
  var v = document.getElementById('showVideo');
  var canvas = document.getElementById('c1');
  var context = canvas.getContext('2d');
  var back = document.createElement('canvas');
  var backcontext = back.getContext('2d');
  var cw, ch;
  cw = 1280;
  ch = 720;
  canvas.width = cw;
  canvas.height = ch;
  back.width = cw;
  back.height = ch;
  draw(v, context, backcontext, cw, ch);
}, false);

// SOURCE - Hailey
function draw(v, c1, bc, cw, ch) {
  var x = Math.random() * 5000;
  // First, draw it into the backing canvas
  bc.drawImage(v, 0, 0, cw, ch);
  // Grab the pixel data from the backing canvas
  var idata = bc.getImageData(0, 0, cw, ch);
  var data = idata.data;
  var w = idata.width;
  var limit = data.length
  // Loop through the subpixels, convoluting each using an edge-detection matrix.
  for (var i = 0; i < limit; i++) {
    if (i % 4 == 3) continue;

    if (x % 30 < 10) {
      data[i] = 120 + 3 * data[i] - data[i + 2] - data[i + w * 3];
    }
    if (t % 40 < 1) {
      data[i] = 5 * data[i] - data[i + 13] - data[i + w * 3];
    }
    if (t % 30 < 3) {
      data[i] = data[i] - data[i + 4];
    }
    if (x % 13 < 1) {
      data[i] = data[i - 4] - .5;
    }
  }
  c1.putImageData(idata, 0, 0);
  // Start over!
  t++;
  setTimeout(draw, 20, v, c1, bc, cw, ch);
}
