const db = require("../_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Chapter.findAll();
}

async function getById(id) {
  return await getChapter(id);
}

async function create(params) {
  // validate
  if (await db.Chapter.findOne({ where: { title: params.title } })) {
    //throw 'Email "' + params.email + '" is already registered';
    return await db.Chapter.findOne({ where: { title: params.title } });
  }
  else {
    const chapter = new db.Chapter(params);
    // save chapter
    await chapter.save();
    return chapter;
  }
}

async function update(id, params) {
  const chapter = await getChapter(id);

  // copy params to chapter and save
  Object.assign(chapter, params);
  await chapter.save();
}


async function _delete(id) {
  const chapter = await getChapter(id);
  await chapter.destroy();
}

// helper functions

async function getChapter(id) {
  const chapter = await db.Chapter.findByPk(id);
  if (!chapter) throw "Chapter not found";
  return chapter;
}
