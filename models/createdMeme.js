module.exports = function(sequelize, DataTypes) {
    var CreatedMeme = sequelize.define("CreatedMeme", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[1]
            }
        },
        meme: {
            type: DataTypes.STRING,
            allowNull: false
        },
        topText: {
            type: DataTypes.TEXT
        },
        bottomText: {
            type: DataTypes.TEXT
        }
    });

    //the created meme is linked with the User that made the meme
    CreatedMeme.associate = function(models) {
        CreatedMeme.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return CreatedMeme;
}