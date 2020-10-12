var db = require("../models");

module.exports = function(app) {
    app.get("/api/users", function(req, res) {
        db.User.findAll({
             // We set the value to an array of the models we want to include in a left outer join
            include: [db.CreatedMeme]
        }).then(function(dbUsers) {
            //will convert all users in database to a json()
            res.json(dbUsers);
        });
    });

    app.get("/api/users/:id", function(req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [db.CreatedMeme]
        }).then(function(dbUsers) {
            res.json(dbUsers);
        });
    });

    app.post("/api/users", function(req, res) {
        db.User.create(req.body).then(function(dbUsers) {
            res.json(dbUsers);
        });
    });

    app.delete("/api/users/:id", function(req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        })
    });
}