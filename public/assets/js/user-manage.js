$(document).ready(function() {
    //getting the required jquery's from the html
    var nameInput = $("#memer-name");
    var memerList = $("tbody");
    var memerContainer = $(".memer-container");

    // Adding event listeners to the form to create a new object, and the button to delete
    // an Memer
    $(document).on("submit", "#memer-form", handleMemerFormSubmit);
    $(document).on("click", ".delete-memer", handleDeleteButtonPress);

    // Getting the initial list of meme creators
    getMemeCreators();

    function handleMemerFormSubmit(event) {
        event.preventDefault();
        console.log("pressed!!");

        // Don't do anything if the name fields hasn't been filled out
        if(!nameInput.val().trim().trim()) {
            return;
        }

        // Calling the upsertMemer function and passing in the value of the name input
        upsertMemer({
            username: nameInput
                .val()
                .trim()
        });
    }

    // A function for creating an meme creator. Calls getMemeCreators upon completion
    function upsertMemer(memerData) {
        $.post("/api/users", memerData)
            .then(getMemeCreators);
    }


    // Function for creating a new list row for memers
    function createMemerRow(memerData) {
        var newTr = $("<tr>");
        newTr.data("memer", memerData);
        newTr.append("<td>" + memerData.username + "</td>");
        if(memerData.CreatedMeme) {
            newTr.append("<td> " + memerData.CreatedMeme.length + "</td>");
        }
        else {
            newTr.append("<td>0</td>");
        }
        newTr.append("<td><a href = '/memes?creator_id=" + memerData.id + "'>Go To Memes</a></td>");
        newTr.append("<td><a href= '/users?creator_id=" + memerData.id + "'>Create a Meme</a></td>");
        newTr.append("<td><a stlye= 'cursor:pointer;color:red' class = 'delete-memer'>Delete Memer</a></td>");
        return newTr;
    }

    // Function for retrieving meme creators and getting them ready to be rendered to the page
    function getMemeCreators() {
        $.get("/api/users", function(data) {
            var rowsToAdd = [];
            for(var i = 0; i < data.length; i++) {
                rowsToAdd.push(createMemerRow(data[i]));
            }
            renderMemerList(rowsToAdd);
            nameInput.val("");
        });
    }

    // A function for rendering the list of memers to the page
    function renderMemerList(rows) {
        memerList.children().not(":last").remove();
        memerContainer.children(".alert").remove();
        if(rows.length) {
            console.log(rows);
            memerList.prepend(rows);
        }
        else {
            renderEmpty();
        }
    }

    // Function for handling what to render when there are no meme creators
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("You must input a memer before making a meme");
        memerContainer.append(alertDiv);
    }

    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
        var listItemData = $(this).parent("td").parent("tr").data("memer");
        var id = listItemData.id;
        $.ajax({
            method: "DELETE",
            url: "/api/users/" + id
        })
            .then(getMemeCreators);
    }
});