var db = require("../models");

module.exports = function(app) {
    app.get("/api/posts", function(req, res) {
        var query = {};
        if(req.query.user_id) {
            query.UserID = req.query.user_id;
        }

        db.CreatedMeme.findAll({
            where: query,
            include: [db.User]
        }).then(function(dbPost) {
            res.json(dbPost);
            console.log(dbPost);
        });
    });

    app.get("/api/posts/:id", function(req, res) {
        db.CreatedMeme.fincdOne({
            where: {
                id: req.params.id
            },
            include: [db.User]
        }).then(function(dbPost) {
            res.json(dbPost);
            console.log(dbPost);
        });
    });

    //POST route for saving a new post
    app.post("/api/posts", function(req, res) {
        db.CreatedMeme.create(req.body).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    // PUT route for updating posts
    app.put("/api/posts", function(req, res) {
        db.CreatedMeme.update(
        req.body,
        {
            where: {
            id: req.body.id
            }
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });


    // DELETE route for deleting posts
    app.delete("/api/posts/:id", function(req, res) {
        db.CreatedMeme.destroy({
        where: {
            id: req.params.id
        }
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });
}
