// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loadshomepage.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/homepage.html"));
  });

  app.get("/create", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/createMeme.html"));
  });

  app.get("/liked", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/likedMemes.html"));
  });

  //load 
};