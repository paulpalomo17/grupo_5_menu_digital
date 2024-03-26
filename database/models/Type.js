module.exports = (sequelize, DataTypes) => {
    let alias = 'Type';
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
        tableName : "types",
        timestamps: false
    }
    const Type = sequelize.define(alias, cols, config);

    // Asociaciones
    Type.associate = (models) => {
        Type.hasMany(models.Product, {
            as: "products",
            foreignKey: "type_id"
        });
    };

    return Type;
};