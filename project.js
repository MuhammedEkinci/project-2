let topTextInput, bottomTextInput, topTextSizeInput, bottomTextSizeInput, imageInput, generateBtn, canvas, ctx;

function generateMeme(img, topText, bottomText, topTextSize, bottomTextSize) {
    let fontSize;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0, 0, canvas.height);
    ctx.drawImage(img, 0, 0);

    //Top text font size
    fontSize = canvas.width * topTextSize;
    ctx.font = fontSize + 'px Impact';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = fontSize / 20;
    ctx.txtAlign = 'center';

    // Draw top text
    ctx.textBaseline = 'top';
    topTextInput.split('\n').forEach(function (t, i) {
        ctx.strokeText(bottomText, canvas.width / 2, i * fontSize, canvas.width);
        ctx.fillText(topText, canvas.width / 2, i * fontSize, canvas.width);
    });
    
    // Draw Bottom text
    fontSize = canvas.width * bottomTextSize;
    ctx.textBaseline = "bottom";
    bottomText.split('\n').forEach(function (t, i) {
        ctx.FillText(bottomtext, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
        ctx.strokeText(bottomtext, canvas.width / 2, canvas.height - i * fontSize, canvas.width);

    });

function init() {
    topTextSizeInput = document.getElementById('top-text-size-input');
    bottomTextSizeInput = document.getElementById('bottom-text-size-input');
    imageInput = document.getElementById('image-input');
    generateBtn = document.getElementById('meme.canvas');
    canvas = document.getElementById('meme-canvas')

    ctx = canvas.getContext('2d');
    canvas.width = canvas.height = 0;
    generateBtn.addEventListener('click', function () {
        let reader = new FileReader();
        reader.onload = function () {
            let img = new Image;
            img.src = reader.result;
            generateMeme(img, topTextInput.value, bottomTextInput.value, topTextSizeInput.value, bottomTextSizeInput.value);

        };
        reader.readAsDataURL(imageInput.files[0]);

    });

}
init();