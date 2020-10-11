$(document).ready(function() {

    //get the jquery info that we need
    var topInput = $("#top-text");
    var bottomInput = $("#bottom-text");
    var titleInput = $("#title-meme");
    var memeForm = $("#meme-form");
    var creatorSelect = $("#meme-creator");


    let memeURL = "https://api.imgflip.com/get_memes";

    fetch(memeURL)
    .then(data => data.json())
    .then(json => {
      console.log(json);
        
        for(var i = 0; i < 30; i++) {

            //stores all memes retrieved form API
            var popMemesDiv = $("<a class = 'meme-display col-lg-2'>");
    
    
            //get meme img from API
            var memeIMG = json.data.memes[i].url;
            console.log(memeIMG);

             //variabel to hold meme data
             var meme = json.data.memes[i].url;
    
            //creates div to store memesIMG
            var img = $("<img>").addClass("meme-img").attr("src", memeIMG).width(100).height(100);
            img.attr("data-url", meme);
            popMemesDiv.append(img);
    
    
            //prepend to memes div
            $(".meme-choices").prepend(popMemesDiv);

        }
    })
    .catch(error => console.log(error));

       //when img is clicked console.log the url to image
       $(document).on('click','.meme-img', function() {
            console.log($(this).attr("data-url"));
       });

  });