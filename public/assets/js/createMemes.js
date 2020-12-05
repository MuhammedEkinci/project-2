$(document).ready(function() {
    let memeURL="https://api.imgflip.com/get_memes";

    fetch(memeURL)
    .then(data => data.json())
    .then(json => {
      console.log(json);
        
        for(var i = 0; i < 100; i++) {

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

    //get the jquery info that we need
    var topInput = $("#top-text");
    var bottomInput = $("#bottom-text");
    var titleInput = $("#title-meme");
    var memeForm = $("#meme");
    var creatorSelect = $("#meme-creator");
    //var memeChoices = $("meme-choices");
    //will store the memeURL here
    var memeLink;

    // Adding an event listener for when the form is submitted
    $(memeForm).on("submit", handleFormSubmit);  

    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    var url = window.location.search;
    var memeId;
    var creatorId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;

    // If we have this section in our url, we pull out the meme id from the url
    // In '?post_id=1', memeId is 1
    if(url.indexOf("?meme_id=") !== -1) {
        memeId = url.split("=")[1];
        getMemeData(memeId, "meme");
    }
    // Otherwise if we have an creator_id in our url, preset the creator select box to be our memeCreator
    else if(url.indexOf("?creator_id=") !== -1) {
        creatorId = url.split("=")[1];
    }

    //when img is clicked console.log the url to image
    $(document).on('click','.meme-img', function() {
         memeLink = $(this).attr("data-url");
         $(this).css("box-shadow", "0 0 5px 2px red");
         console.log("clicked!1");
         //memeChoices.addClass("hidden");
    });

    // Getting the authors, and their posts
    getMemeCreators();

    // A function for handling what happens when the form to create a new meme is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        console.log("pressed!");
        console.log(memeLink);
        //memeChoices.removeClass("hidden");

        // Wont submit the meme if we are missing a top-text, bottom-text, title, or memeCreator
        // if(!titleInput.val().trim() || !topInput.val().trim() || !bottomInput.val().trim() || !creatorSelect.val().trim()) {
        //     return;
        // }

        // Constructing a newMeme object to hand to the database
         var newMeme = {
             title: titleInput
                .val()
                .trim(),
            meme: memeLink,
            topText: topInput
                .val()
                .trim(),
            bottomText: bottomInput
                .val()
                .trim(),
            UserId: creatorSelect.val()
         };

         // If we're updating a post run updatePost to update a post
        // Otherwise run submitPost to create a whole new post
        if(updating) {
            newMeme.id = memeId;
            updateMeme(newMeme);
        }
        else {
            submitMeme(newMeme);
        }
    }

    // Submits a new meme and brings user to meme page upon completion
    function submitMeme(meme) {
        $.post("/api/posts", meme, function() {
            window.location.href = "/memes";
        });
    }

    // Gets meme data for the current meme if we're editing, or if we're adding to an creator's existing memes
    function getMemeData(id, type) {
        var queryUrl;
        switch (type) {
            case "meme":
                queryUrl = "/api/posts/" + id;
                break;
            case "creator":
                queryUrl = "/api/users/" + id;
                break;
            default:
                return;
        }
        $.get(queryUrl, function(data) {
            if(data) {
                console.log(data.CreatorId || data.id);
                // If this meme exists, prefill our meme forms with its data
                titleInput.val(data.title);
                memeLink.val(data.meme);
                topInput.val(data.topText);
                bottomInput.val(data.bottomText);
                creatorId = data.CreatorId || data.id;
                // If we have a meme with this id, set a flag for us to know to update the post
                // when we hit submit
                updating = true;
            }
        });
    }

    // A function to get memeCreators and then render our list of Creators
    function getMemeCreators() {
        $.get("/api/users", renderCreatorList);
    }
    // Function to either render a list of creators, or if there are none, direct the user to the page
    // to create an memeCreator first
    function renderCreatorList(data) {
        if(!data.length) {
            window.location.href = "/users";
        }
        $(".hidden").removeClass("hidden");
        var rowsToAdd = [];
        for(var i = 0; i < data.length; i++) {
            rowsToAdd.push(createMemerRow(data[i]));
        }
        creatorSelect.empty();
        console.log(rowsToAdd);
        console.log(creatorSelect);
        creatorSelect.append(rowsToAdd);
        creatorSelect.val(creatorId);
    }

    // Creates the memeCreator options in the dropdown
    function createMemerRow(memer) {
        var listOption = $("<option>");
        listOption.attr("value", memer.id);
        listOption.text(memer.username);
        return listOption;
    }

    // Update a given meme, bring user to the meme page when done
    function updateMeme(meme) {
        $.ajax({
            method: "PUT",
            url: "/api/posts",
            data: meme
        })
        .then(function() {
            window.location.href = "/memes";
        });
    }
  });