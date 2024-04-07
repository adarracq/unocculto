const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        username1: { type: DataTypes.STRING, allowNull: false },
        username2: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' },
    };
    return sequelize.define('Friend', attributes);
}