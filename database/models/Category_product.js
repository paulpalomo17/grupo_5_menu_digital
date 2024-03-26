module.exports = (sequelize, DataTypes) => {
    let alias = 'Category_product';
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
        tableName : "categories_products",
        timestamps: false
    }
    const Category = sequelize.define(alias, cols, config);

    // Asociaciones
    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "category_id"
        });
    };

    return Category;
};