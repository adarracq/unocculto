const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        username1: { type: DataTypes.STRING, allowNull: false },
        username2: { type: DataTypes.STRING, allowNull: true },
        results: { type: DataTypes.JSON, allowNull: true },
        status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    };
    return sequelize.define('Duel', attributes);
}
/*
status:
0 : pending
1 : started
2 : user1 win
3 : user2 win
4 : draw

results : [
    {
        themeId: 9,
        selector: (username)
        questions : [
            {
                questionId: 137,
                user1Answer: 1,
                user2Answer: 3,
                answer: 1
            }
        ]
    }
]
*/

