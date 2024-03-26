module.exports = (sequelize, DataTypes) => {
    let alias = 'Cart';
    let cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        }
    };
    let config = {
        tableName : "carts",
        timestamps: false,
    };
    const Cart = sequelize.define(alias, cols, config);

    // Asociaciones
    Cart.associate = (models) => {
        Cart.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id",
        });
        Cart.belongsToMany(models.Product, {
            as: "products",
            through: "product_cart",
            foreignKey: 'cart_id',
            otherKey: 'product_id',
            timestamps: false
        });
    };

    return Cart;
};