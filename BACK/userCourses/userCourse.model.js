const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userEmail: { type: DataTypes.STRING, allowNull: false },
        courseId: { type: DataTypes.INTEGER, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'started' },
    };
    return sequelize.define('UserCourse', attributes);
}