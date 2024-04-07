const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userEmail: { type: DataTypes.STRING, allowNull: false },
        chapterId: { type: DataTypes.INTEGER, allowNull: false },
        courseId: { type: DataTypes.INTEGER, allowNull: false },
    };
    return sequelize.define('UserChapter', attributes);
}