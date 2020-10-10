//when a ameme is liked it will go to memeliked.html page
var db = require("../models");

module.exports = function(app) {
    var query = {};
    if(req.query.id) {
        query.
    }

    app.get("/api/likedMemes", function(req, res) {
        db.LikedMemes.findAll({}).then(function(data) {
            res.json(data);
        })
    });
    
}
