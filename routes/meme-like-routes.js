//when a ameme is liked it will go to memeliked.html page
var db = require("../models");

module.exports = function(app) {
    app.get("/api/likedMemes", function(req, res) {
        db.likedMemes.findAll({}).then(function(data) {
            res.json(data);
        })
    });
    
}
