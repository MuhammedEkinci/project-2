module.exports = function(sequelize, DataTypes) {
    var CreatedMeme = sequelize.define("created_memes", {
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
            type: DataTypes.STRING
        },
        bottomText: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[1]
            }
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
}