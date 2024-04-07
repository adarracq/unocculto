const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },
        firstname: { type: DataTypes.STRING, allowNull: true },
        lastname: { type: DataTypes.STRING, allowNull: true },
        username: { type: DataTypes.STRING, allowNull: true },
        imageUrl: { type: DataTypes.STRING, allowNull: true },
        lives: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 3 },
        coins: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        role: { type: DataTypes.STRING, allowNull: true, defaultValue: 'user' },
        level: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
    };
    return sequelize.define('User', attributes);
}