document.addEventListener('keypress', function(){
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
    console.log("drawing");
    // First, draw it into the backing canvas
    bc.drawImage(v,0,0,cw,ch);
    // Grab the pixel data from the backing canvas
    var idata = bc.getImageData(0,0,cw,ch);
    var data = idata.data;
    var w = idata.width;
    var limit = data.length
    // Loop through the subpixels, convoluting each using an edge-detection matrix.
    for(var i = 0; i < limit; i++) {
        if( i%4 == 3 ) continue;
        data[i] = 127 + 2*data[i] - data[i + 4] - data[i + w*4];
    }
    // Draw the pixels onto the visible canvas
    c1.putImageData(idata,0,0);
    // Start over!
    setTimeout(draw,20,v,c1,bc,cw,ch);
}
