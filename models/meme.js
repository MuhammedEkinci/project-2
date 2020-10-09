const { DataTypes } = require("sequelize");

//creating likedMemes model
module.exports = function(sequalize, DataTypes) {
    var likedMemes = sequalize.define("likedMeme", {
        meme: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isLiked: true
            }
        }
    });
    return likedMemes;
};