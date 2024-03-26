module.exports = (sequelize, DataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: "default-image-product.jpg"
        },
        category_id: {
            type: DataTypes.INTEGER(10).UNSIGNED
        },
        type_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT.UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName : "products",
        timestamps: false,
    };
    const Product = sequelize.define(alias, cols, config);

    // Asociaciones
    Product.associate = (models) => {
        Product.belongsTo(models.Category_product, {
            as: "categories_products",
            foreignKey: "category_id",
        });
        Product.belongsTo(models.Type, {
            as: "types",
            foreignKey: "type_id",
        });
        Product.belongsToMany(models.Cart, {
            as: "carts",
            through: "product_cart",
            foreignKey: "product_id",
            otherKey: 'cart_id',
            timestamps: false
        });
    };

    return Product;
};