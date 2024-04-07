const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userEmail: { type: DataTypes.STRING, allowNull: false },
        questionId: { type: DataTypes.INTEGER, allowNull: false },
        nextReview: { type: DataTypes.DATE, allowNull: true },
        level: { type: DataTypes.INTEGER, allowNull: true },
        themeId: { type: DataTypes.INTEGER, allowNull: true },
    };
    return sequelize.define('UserCard', attributes);
}