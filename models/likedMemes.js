

//creating likedMemes model
module.exports = function(sequalize, DataTypes) {
    var LikedMemes = sequalize.define("likedMemes", {
        meme: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return LikedMemes;
};