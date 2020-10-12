$(document).ready(function() {
    let memeURL = "https://api.imgflip.com/get_memes";

    $(document).on('click','.meme-img', doSomething)

    fetch(memeURL)
    .then(data => data.json())
    .then(json => {
      console.log(json);

      const memes = json.data.memes;
  
      for(var i = 0; i < 80; i++) {
        //stores all memes retrieved form API
        var popMemesDiv = $("<a class = 'meme-display col-lg-2' >");
        //get meme img from API
        var memeIMG = json.data.memes[i].url;
        console.log(memeIMG);
  
        //creates div to store memesIMG
        var img = $("<img>").addClass("meme-img").attr("src", memeIMG).width(180).height(180);
        popMemesDiv.append(img);
        $("img").css("padding","9px");
        //prepend to memes div
        $(".meme-choices").prepend(popMemesDiv);
      }
    })
    .catch(error => console.log(error));

    function doSomething() {
    //$(this).appendTo('#like-images')
    //    console.log('anythiing')
     




        })
      
    }

  });
