var t = 0;
var glitch = 0
var x = Math.random() * 5000;

document.addEventListener('keypress', function glitch(){
    var v = document.getElementById('showVideo');
    var canvas = document.getElementById('c1');
    var context = canvas.getContext('2d');
    var back = document.createElement('canvas');
    var backcontext = back.getContext('2d');
    console.log("successfully init");

    var cw,ch;

    glitchButton.addEventListener('click', function(){
        cw = v.clientWidth;
        ch = v.clientHeight;
        canvas.width = cw;
        canvas.height = ch;
        back.width = cw;
        back.height = ch;
        draw(v,context,backcontext,cw,ch);
    },false);

},false);

function draw(v,c1,bc,cw,ch) {
    // First, draw it into the backing canvas
    bc.drawImage(v,0,0,cw,ch);
    // Grab the pixel data from the backing canvas
    var idata = bc.getImageData(0,0,cw,ch);
    var data = idata.data;
    var w = idata.width;
    var limit = data.length
    // Loop through the subpixels, convoluting each using an edge-detection matrix.
    for(var i = 0; i < limit; i++) {
        if(i%4 == 3 ) continue;
        if((x * x/t)%30 < 3){
        data[i] = 120 + 3*data[i] - data[i + 2] - data[i + w*3];
        }
        if(t%5 < 1){
            data[i] = 5*data[i] - data[i + 4] - data[i + w*3];
        }
        if(t%50 < 3){
            data[i] = data[i] - data[i + 4];
        }

    }
    c1.putImageData(idata,0,0);
    // Start over!
    t++;
    setTimeout(draw,20,v,c1,bc,cw,ch);
    };

