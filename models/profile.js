module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("profile", {
        username: DataTypes.STRING,
        validate: {
            len: [1]
        }
    });

    User.associate = function(models) {
        //If a user is deleted than delete all the memes he has made
        User.hasMany(models.CreatedMeme, {
            onDelete: "cascade"
        });
    };

    return User;
}