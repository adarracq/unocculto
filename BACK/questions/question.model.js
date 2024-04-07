const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        question: { type: DataTypes.STRING, allowNull: false },
        answer: { type: DataTypes.STRING, allowNull: false },
        wrongAnswer1: { type: DataTypes.STRING, allowNull: false },
        wrongAnswer2: { type: DataTypes.STRING, allowNull: false },
        wrongAnswer3: { type: DataTypes.STRING, allowNull: false },
        imageUrl: { type: DataTypes.STRING, allowNull: true },
        chapterId: { type: DataTypes.INTEGER, allowNull: true },
        courseId: { type: DataTypes.INTEGER, allowNull: true },
        themeId: { type: DataTypes.INTEGER, allowNull: true },
    };
    return sequelize.define('Question', attributes);
}