
var db = require("../models");

module.exports = function(app) {

    // GET route for getting all of the posts
    app.get("/api/likedMemes", function(req, res) {
        var query = {};
        if(req.query.creator_id) {
            query.CreatorId = req.query.creator_id;
        }

        db.LikedMeme.findAll({
            where: query,
            include: [db.User]
        }).then(function(dbLiked) {
            res.json(dbLiked);
        })
    });

    // Get route for retrieving a single post
    app.get("/api/likedMemes/:id", function(req, res) {
        db.LikedMeme.fincdOne({
            where: {
                id: req.params.id
            },
            include: [db.User]
        }).then(function(dbLiked) {
            res.json(dbLiked);
            console.log(dbLiked);
        });
    });

      //POST route for saving a new Liked Meme
      app.post("/api/likedMemes", function(req, res) {
        db.LikedMeme.create(req.body).then(function(dbLiked) {
            res.json(dbLiked);
        });
    });

    // DELETE route for deleting liked Memes
    app.delete("/api/likedMemes/:id", function(req, res) {
        db.LikedMeme.destroy({
        where: {
            id: req.params.id
        }
        }).then(function(dbLiked) {
            res.json(dbLiked);
        });
    });
}
