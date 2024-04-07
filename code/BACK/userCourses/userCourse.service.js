const db = require("../_helpers/db");

module.exports = {
  getAll,
  getById,
  getByUserEmail,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.UserCourse.findAll();
}

async function getById(id) {
  return await getUserCourse(id);
}

async function getByUserEmail(userEmail) {
  return await db.UserCourse.findAll({ where: { userEmail: userEmail } });
}

async function create(params) {
  console.log(params);
  // validate
  if (await db.UserCourse.findOne({ where: { userEmail: params.userEmail, courseId: params.courseId } })) {
    //throw 'Email "' + params.email + '" is already registered';
    return await db.UserCourse.findOne({ where: { userEmail: params.userEmail, courseId: params.courseId } });
  }
  else {
    const userCourse = new db.UserCourse(params);
    // save userCourse
    await userCourse.save();
    return userCourse;
  }
}

async function update(id, params) {
  const userCourse = await getUserCourse(id);

  // copy params to userCourse and save
  Object.assign(userCourse, params);
  await userCourse.save();
}


async function _delete(id) {
  const userCourse = await getUserCourse(id);
  await userCourse.destroy();
}

// helper functions

async function getUserCourse(id) {
  const userCourse = await db.UserCourse.findByPk(id);
  if (!userCourse) throw "User course not found";
  return userCourse;
}
