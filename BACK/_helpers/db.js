// const config = require('config.json');
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
require("dotenv").config();

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  // const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    port: process.env.DB_PORT,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\`;`
  );

  // connect to db
  const sequelize = new Sequelize(
    `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
  );

  // init models and add them to the exported db object
  db.User = require("../users/user.model")(sequelize);
  db.Theme = require("../themes/theme.model")(sequelize);
  db.Course = require("../courses/course.model")(sequelize);
  db.Chapter = require("../chapters/chapter.model")(sequelize);
  db.UserChapter = require("../userChapters/userChapter.model")(sequelize);
  db.UserCourse = require("../userCourses/userCourse.model")(sequelize);
  db.Question = require("../questions/question.model")(sequelize);
  db.UserCard = require("../userCards/userCard.model")(sequelize);
  db.Friend = require("../friends/friend.model")(sequelize);
  db.Duel = require("../duels/duel.model")(sequelize);
  db.DuelAnswer = require("../duelAnswers/duelAnswer.model")(sequelize);

  // sync all models with database
  await sequelize.sync({ alter: true });
}
