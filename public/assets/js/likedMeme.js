$(document).ready(function() {

    //like memes will be appended in this variable
    var likedMemeContainer = $(".likedMeme-container");
    var memeCategorySelect = $("#category");

    //click events for dislike
    $(document).on("click", "button.dislike", handleMemeDislike);

    //variable to hold memes
    var memes;

    // The code below handles the case where we want to get meme posts for a specific meme creator
    // Looks for a query param in the url for creator_id

    var url = window.location.href;
    var creatorId;
    if(url.indexOf("?creator_id=") !== -1) {
        creatorId = url.split("=")[1];
        getMemes(creatorId);
    }
    else {
        //if no creatorId then get all liked memes
        getMemes();
    }

    // This function grabs memes from the database and updates the view
    function getMemes(creator) {
        creatorId = creator || "";
        if(creatorId) {
            creatorId = "/?creator_id=" + creatorId;
        }
        $.get("/api/likedMemes" + creatorId, function(data) {
            console.log("Memes", data);
            memes = data;
            if(!memes || !memes.length) {
                displayEmpty(creator);
            }
            else{
                initializeRows();
            }
        });
    }

    //This function will delete the likedMeme
    function deleteMeme(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/likedMemes/" + id
        })
        .then(function() {
            getMemes(memeCategorySelect.val());
        });
    }

    // InitializeRows handles appending all of our constructed post HTML inside likedMemeContainer
    function initializeRows() {
        likedMemeContainer.empty();
        var memeToAdd = [];
        for( var i = 0; i < memes.length; i++) {
            memeToAdd.push(createNewRow(memes[i]));
        }
        likedMemeContainer.append(memeToAdd);
        console.log(memeToAdd);
    }

    // This function constructs a meme's HTML
    function createNewRow(memeLiked) {
        //get the date of when the meme was posted
        var formattedDate = memeLiked.createdAt;
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");

        //<div> that will hold the liked memes
        var newPostCard = $("<div>");
        newPostCard.addClass("card");

        //the heading of the card
        var newPostCardHeading = $("<div>"); 
        newPostCardHeading.addClass("card-header");

        //dislike button
        var dislikeBtn = $("<button><i class='far fa-thumbs-down'></i>");
        dislikeBtn.addClass("dislike");

        //meme title
        var newMemeTite = $("<h2>");
        newMemeTite.text(memeLiked.title + " ");
        
        //meme date
        var newMemeDate = $("<small>");
        newMemeDate.text(formattedDate);

        //meme username
        var newMemeCreator = $("<h5>");
        newMemeCreator.text("Memer: " + memeLiked.User.username);
        newMemeCreator.css({
            float: "right",
            color: "green",
            "margin-top": 
            "-10px"
        });

        //meme Img
        var newMemeImg = $("<img>");
        newMemeImg.addClass("card-img-top");
        newMemeImg.attr("src", memeLiked.meme);

        //the card body for meme
        var newMemeCardBody = $("<div>");
        newMemeCardBody.addClass("card-body");

         //meme top text
         var newMemeTopText = $("<p>");
         newMemeTopText.text(memeLiked.top_Text);

         var topMemeTextDiv = $("<div>");
         topMemeTextDiv.addClass("text-block-top");
         topMemeTextDiv.append(newMemeTopText);
 

        //meme bottom text
        var newMemeBottomText = $("<p>");
        newMemeBottomText.text(memeLiked.bottom_Text);

        var bottomMemeTextDiv = $("<div>");
        bottomMemeTextDiv.addClass("text-block-bottom");
        bottomMemeTextDiv.append(newMemeBottomText);


        //append date to title
        newMemeTite.append(newMemeDate);


        //meme card heading
        newPostCardHeading.append(dislikeBtn);
        newPostCardHeading.append(newMemeTite);
        newPostCardHeading.append(newMemeCreator);

        //append to meme card body
        newMemeCardBody.append(newMemeImg);
        newMemeCardBody.append(topMemeTextDiv);
        newMemeCardBody.append(bottomMemeTextDiv);

        //append everything to main div newPostCard
        newPostCard.append(newPostCardHeading);
        newPostCard.append(newMemeCardBody);
        newPostCard.data("meme", memeLiked);
        return newPostCard;

    }

    //function that handles dislike meme
    function handleMemeDislike() {
        console.log("works!!");
        var currentMeme = $(this).parent().parent().data("meme");

        deleteMeme(currentMeme.id);
    }

    //Fucntion that display message when there are no liked memes
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if(id) {
            partial = "for Memer #" + id;
        }
        likedMemeContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({"text-align": "center", "margin-top": "50px"});
        messageH2.html("You did not like any Memes!!" + partial + ", Click <a href= '/memes" + query + 
        "'>Home</a> and like a Meme DAMMIT!!");
        likedMemeContainer.append(messageH2);
    }
});