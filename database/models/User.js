module.exports = (sequelize, DataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            unique : true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: "default-image-user.png"
        }
    };
    let config = {
        tableName : "users",
        timestamps: false,
    };
    const User = sequelize.define(alias, cols, config);

    // Asociaciones
    User.associate = (models) => {
        User.belongsTo(models.Category_user, {
            as: "categories_users",
            foreignKey: "category_id",
        });
        User.hasMany(models.Cart, {
            as: "carts",
            foreignKey: "user_id",
        });
    };

    return User;
};