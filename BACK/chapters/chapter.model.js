const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        title: { type: DataTypes.STRING, allowNull: false },
        imageUrl: { type: DataTypes.STRING, allowNull: true },
        dateStart: { type: DataTypes.DOUBLE, allowNull: true },
        dateEnd: { type: DataTypes.DOUBLE, allowNull: true },
        shortDescription: { type: DataTypes.TEXT, allowNull: true },
        simpleDescription: { type: DataTypes.TEXT, allowNull: true },
        longDescription: { type: DataTypes.TEXT, allowNull: true },
        courseId: { type: DataTypes.INTEGER, allowNull: false },
        themeId: { type: DataTypes.INTEGER, allowNull: false },
    };
    return sequelize.define('Chapter', attributes);
}