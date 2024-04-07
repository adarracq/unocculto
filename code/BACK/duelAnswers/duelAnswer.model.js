const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user1Answer: { type: DataTypes.STRING, allowNull: true },
        user2Answer: { type: DataTypes.STRING, allowNull: true },
        questionId: { type: DataTypes.INTEGER, allowNull: false },
        duelId: { type: DataTypes.INTEGER, allowNull: false },
    };
    return sequelize.define('DuelAnswer', attributes);
}