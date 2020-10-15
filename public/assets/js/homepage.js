
$(document).ready(function() {
    // memeContainer holds all of our posts
    var memeContainer = $(".meme-container");
    var memeCategorySelect = $("#category");

    // Click events for the edit, like, and delete buttons
    $(document).on("click", "button.delete", handleMemeDelete);
    $(document).on("click", "button.edit", handleMemeEdit);
    $(document).on("click", "button.like-btn", handleMemeLike);

    // Variable to hold our memes
    var memes;

    // The code below handles the case where we want to get meme posts for a specific meme creator
    // Looks for a query param in the url for creator_id
    var url = window.location.search;
    var creatorId;
    if(url.indexOf("?creator_id=") !== -1) {
        creatorId = url.split("=")[1];
        getMemes(creatorId);
    }
    // If there's no creatorId we just get all memes as usual
    else {
        getMemes();
    }

    // This function grabs memes from the database and updates the view
    function getMemes(creator) {
        creatorId = creator || "";
        if(creatorId) {
            creatorId = "/?creator_id=" + creatorId;
        }
        $.get("/api/posts" + creatorId, function(data) {
            console.log("Memes", data);
            memes = data;
            if(!memes || !memes.length) {
                displayEmpty(creator);
            }
            else {
                initializeRows();
            }
        });
    }

    // This function does an API call to delete posts
    function deleteMeme(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/posts/" + id
        })
        .then(function() {
            getMemes(memeCategorySelect.val());
        })
    }
    // InitializeRows handles appending all of our constructed post HTML inside memeContainer
    function initializeRows() {
        memeContainer.empty();
        var memeToAdd = [];
        for(var i = 0; i < memes.length; i++) {
            memeToAdd.push(createNewRow(memes[i]));
        }
        memeContainer.append(memeToAdd);
        console.log(memeToAdd);
    }

    // This function constructs a meme's HTML
    function createNewRow(memes) {
        //get the date of when the meme was posted
        // var formattedDate = new Date(memes.createdAt);
        // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");

        //<div> that will hold the posted memes
        var newPostCard = $("<div>");
        newPostCard.addClass("card meme-card");

        //the heading of the card
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");

        //delete button
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");

        //edit button
        // var editBtn = $("<button>");
        // editBtn.text("EDIT");
        // editBtn.addClass("edit btn btn-info");

        //like button
        var likeBtn = $("<button><i class='far fa-thumbs-up'></i>");
        likeBtn.addClass("like-btn");

        //meme title
        var newMemeTitle = $("<h2>");
        newMemeTitle.text(memes.title + " ");

        // //meme date
        // var newMemeDate = $("<small>");
        // newMemeDate.text("Posted:"  + formattedDate);

        //meme username
        var newMemeCreator = $("<h5>");
        newMemeCreator.text("Memer: " + memes.User.username);
        newMemeCreator.css({
            float: "right",
            color: "green",
            "margin-top": 
            "-10px"
        });

        //meme img
        var newMemeImg = $("<img>");
        newMemeImg.addClass("card-img-top post-img");
        newMemeImg.attr("src", memes.meme);
        console.log(memes);

        //the card body for meme
        var newMemeCardBody = $("<div>");
        newMemeCardBody.addClass("card-body");

        //meme top text
        var newMemeTopText = $("<p>");
        newMemeTopText.addClass("top-text");
        newMemeTopText.text(memes.topText);

        var topMemeTextDiv = $("<div>");
        topMemeTextDiv.addClass("text-block-top");
        topMemeTextDiv.append(newMemeTopText);

        //meme bottom text
        var newMemeBottomText = $("<p>");
        newMemeBottomText.addClass("bottom-text");
        newMemeBottomText.text(memes.bottomText);

        var bottomMemeTextDiv = $("<div>");
        bottomMemeTextDiv.addClass("text-block-bottom");
        bottomMemeTextDiv.append(newMemeBottomText);

        //append all the html
        //newMemeTitle.append(newMemeDate);

        //meme card heading
        newPostCardHeading.append(deleteBtn);
        //newPostCardHeading.append(editBtn);
        newPostCardHeading.append(likeBtn);
        newPostCardHeading.append(newMemeTitle);
        newPostCardHeading.append(newMemeCreator);

        //meme card body
        newMemeCardBody.append(newMemeImg);
        newMemeCardBody.append(topMemeTextDiv);
        newMemeCardBody.append(bottomMemeTextDiv);

        //append everything to main div newPostCard
        newPostCard.append(newPostCardHeading);
        newPostCard.append(newMemeCardBody);
        newPostCard.data("meme", memes);
        return newPostCard;
    }

    // This function figures out which post we want to delete and then calls deletePost
    function handleMemeDelete() {
        var currentMeme = $(this).parent().parent().data("meme");

        deleteMeme(currentMeme.id);
    }

    // This function figures out which post we want to edit and takes it to the appropriate url
    function handleMemeEdit() {
        var currentMeme = $(this).parent().parent().data("meme");


        window.location.href = "/posts?creator_id=" + currentMeme.id;
        console.log(currentMeme);
    }

    //function that handles when a meme is liked
    function handleMemeLike(event) {
        event.preventDefault();
        console.log("works!!");

        var currentMeme = $(this).parent().parent().data("meme");
        console.log(currentMeme);

        //constructing likedMeme object to database
        var likedMeme = {
            title: currentMeme.title,
            meme: currentMeme.meme,
            top_Text: currentMeme.topText,
            bottom_Text: currentMeme.bottomText,
            UserId: currentMeme.UserId
        };

        submitMeme(likedMeme);
    }

    //submits a liked meme to and brings them to likedMeme page upon like
    function submitMeme(memeLike) {
        $.post("/api/likedMemes", memeLike, function() {
            window.location.href = "/liked";
        });
    }

    // This function displays a message when there are no posts
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if(id) {
            partial = "for Memer #" + id;
        }
        memeContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No Memes!!" + partial + ", Click <a href= '/create" + query + 
        "'>Meme</a> to join the Dark Side!");
        memeContainer.append(messageH2);
    }
});