const db = require("../_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Theme.findAll();
}

async function getById(id) {
  return await getTheme(id);
}

async function create(params) {
  console.log(params);
  // validate
  if (await db.Theme.findOne({ where: { title: params.title } })) {
    //throw 'Email "' + params.email + '" is already registered';
    return await db.Theme.findOne({ where: { title: params.title } });
  }
  else {
    const theme = new db.Theme(params);
    // save theme
    await theme.save();
    return theme;
  }
}

async function update(id, params) {
  const theme = await getTheme(id);

  // copy params to theme and save
  Object.assign(theme, params);
  await theme.save();
}


async function _delete(id) {
  const theme = await getTheme(id);
  await theme.destroy();
}

// helper functions

async function getTheme(id) {
  const theme = await db.Theme.findByPk(id);
  if (!theme) throw "Theme not found";
  return theme;
}
