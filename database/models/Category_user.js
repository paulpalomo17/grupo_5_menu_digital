module.exports = (sequelize, DataTypes) => {
    let alias = 'Category_user';
    let cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        tableName : "categories_users",
        timestamps: false
    }
    const Category = sequelize.define(alias, cols, config);

    // Asociaciones
    Category.associate = (models) => {
        Category.hasMany(models.User, {
            as: "users",
            foreignKey: "category_id"
        });
    };

    return Category;
};