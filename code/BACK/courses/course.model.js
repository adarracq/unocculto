const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        imageUrl: { type: DataTypes.STRING, allowNull: true },
        dateStart: { type: DataTypes.DOUBLE, allowNull: true },
        dateEnd: { type: DataTypes.DOUBLE, allowNull: true },
        themeId: { type: DataTypes.INTEGER, allowNull: false },
    };
    return sequelize.define('Course', attributes);
}