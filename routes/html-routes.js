// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads homepage.handlebars
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/homepage.handlebars"));
  });

  app.get("/create", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/createMeme.handlebars"));
  });

  app.get("/liked", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/likedMemes.handlebars"));
  });

};