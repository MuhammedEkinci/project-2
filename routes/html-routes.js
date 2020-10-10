// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads homepage.handlebars
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/homepage.html"));
  });
  //create route loads createMeme.handlebars
  app.get("/create", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/createMemes.html"));
  });
//liked route loads likedMemes.handlebars
  app.get("/liked", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/likeMemes.html"));
  });
//memes route loads likedMemes.handlebars
  app.get("/memes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/homepage.html"));
  });
  //users route loads likedMemes.handlebars
  app.get("/users", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user-manage.html"));
  });

};