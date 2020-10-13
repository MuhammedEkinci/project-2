module.exports = function(sequelize, DataTypes) {
    var LikedMeme = sequelize.define("LikedMeme", {
        title: {
            type: DataTypes.STRING,
        },
        meme: {
            type: DataTypes.STRING,
        },
        top_Text: {
            type: DataTypes.TEXT
        },
        bottom_Text: {
            type: DataTypes.TEXT
        }
    });

    //the created meme is linked with the User that made the meme
    LikedMeme.associate = function(models) {
        LikedMeme.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return LikedMeme;
}