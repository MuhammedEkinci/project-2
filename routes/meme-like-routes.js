
var db = require("../models");

module.exports = function(app) {

    app.get("/api/likedMemes", function(req, res) {
        var query = {};
        if(req.query.user_id) {
            query.UserId = req.query.user_id;
        }

        db.LikedMemes.findAll({
            where: query,
            include: [db.Users]
        }).then(function(dbLiked) {
            res.json(dbLiked);
        })
    });

    app.get("/api/likedMemes/:id", function(req, res) {
        db.CreatedMeme.fincdOne({
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
      app.post("/api/likedMeme", function(req, res) {
        db.CreatedMeme.create(req.body).then(function(dbLiked) {
            res.json(dbLiked);
        });
    });

    // DELETE route for deleting liked Memes
    app.delete("/api/likedMemes/:id", function(req, res) {
        db.CreatedMeme.destroy({
        where: {
            id: req.params.id
        }
        }).then(function(dbLiked) {
            res.json(dbLiked);
        });
    });
    
}
