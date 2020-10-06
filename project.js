let topTextInput, bottomTextInput, imageInput, generateBtn, canvas, ctx;

function generateMeme() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0, 0, canvas.height);
    ctx.drawImage(img, 0, 0);

    let fontSize = canvas.width / 15;
    ctx.font = fontSize + 'px Impact';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = fontSize / 15;
    ctx.txtAlign = 'center';
    ctx.textBaseline = 'top';

    ctx.fillText(topText, canvas.width / 2, canvas.height, canvas.width);

    ctx.textBaseline = "bottom";
    ctx.FillText(bottomtext, canvas.width / 2, canvas.height);
    ctx.fillText(bottomtext, canvas.width / 2, canvas.height);

}

function init() {
    topTextInput = document.getElementById('top-text');
    bottomTextInput = document.getElementById('bottomtext');
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
            generateMeme(img, topTextInput.value, bottomTextInput.value);

        };
        reader.readAsDataURL(imageInput.files[0]);

    });

}
init();