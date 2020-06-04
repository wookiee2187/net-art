
start.addEventListener('click', function glitch(){
    var v = document.getElementById('showVideo');
    var canvas = document.getElementById('c1');
    var context = canvas.getContext('2d');
    var back = document.createElement('canvas');
    var backcontext = back.getContext('2d');
    console.log("successfully init");

    var cw,ch;
    
        cw = v.clientWidth;
        ch = v.clientHeight;
        canvas.width = cw;
        canvas.height = ch;
        back.width = cw;
        back.height = ch;
        draw(v,context,backcontext,cw,ch);
},false);

function draw(v,c1,bc,cw,ch) {
    var x = Math.random() * 3000;
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

        if(x%30 < 10){
        data[i] = 120 + 3*data[i] - data[i + 2] - data[i + w*3];
        }
        if(x%40 < 1){
            data[i] = 5*data[i] - data[i + 13] - data[i + w*3];
        }
        if(x%30 < 3){
            data[i] = data[i] - data[i + 4];
        }
        if(x%13 < 1){
            data[i] = data[i + 4];
        }

    }
    c1.putImageData(idata,0,0);
    // Start over!
    setBG();
    setTimeout(draw,20,v,c1,bc,cw,ch);
    };

function setBG(){
    v = document.getElementById('videos');
    c = document.getElementById('c1').toDataURL();
    v.style.background = 'url(' + c + ')';
    //document.body.style.background = 'url('+c+')';
}

