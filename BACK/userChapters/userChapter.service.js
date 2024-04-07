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
  return await db.UserChapter.findAll();
}

async function getById(id) {
  return await getUserChapter(id);
}

async function getByUserEmail(userEmail) {
  return await db.UserChapter.findAll({ where: { userEmail: userEmail } });
}

async function create(params) {
  // validate
  if (await db.UserChapter.findOne({ where: { userEmail: params.userEmail, chapterId: params.chapterId } })) {
    //throw 'Email "' + params.email + '" is already registered';
    return await db.UserChapter.findOne({ where: { userEmail: params.userEmail, chapterId: params.chapterId } });
  }
  else {
    const userChapter = new db.UserChapter(params);
    // save userChapter
    await userChapter.save();
    return userChapter;
  }
}

async function update(id, params) {
  const userChapter = await getUserChapter(id);

  // copy params to userChapter and save
  Object.assign(userChapter, params);
  await userChapter.save();
}


async function _delete(id) {
  const userChapter = await getUserChapter(id);
  await userChapter.destroy();
}

// helper functions

async function getUserChapter(id) {
  const userChapter = await db.UserChapter.findByPk(id);
  if (!userChapter) throw "User chapter not found";
  return userChapter;
}
