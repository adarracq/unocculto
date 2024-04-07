const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        title: { type: DataTypes.STRING, allowNull: false },
        imageUrl: { type: DataTypes.STRING, allowNull: true },
        logoUrl: { type: DataTypes.STRING, allowNull: true },
    };
    return sequelize.define('Theme', attributes);
}