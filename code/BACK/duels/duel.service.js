const db = require("../_helpers/db");
const sequelize = require("sequelize");

module.exports = {
  getAll,
  getByUsername,
  getById,
  create,
  join,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Duel.findAll();
}

async function getByUsername(username) {
  const duels = await db.Duel.findAll({ where: { username1: username } });
  const duels2 = await db.Duel.findAll({ where: { username2: username } });
  return duels.concat(duels2);
}

async function getById(id) {
  return await getDuel(id);
}

async function create(params) {
  // validate
  const _duel = await db.Duel.findOne({ where: { username1: params.username1, username2: params.username2, status: 'started' } });
  const _duel2 = await db.Duel.findOne({ where: { username1: params.username2, username2: params.username1, status: 'started' } });
  if (_duel || _duel2) {
    return _duel || _duel2;
  }
  else {
    const duel = new db.Duel(params);
    // save duel
    await duel.save();
    return duel;
  }
}

async function join(username) {
  // get the last duel created with status 0 and username2 is null and username1 is not the same as the username
  const duel = await db.Duel.findOne({ where: { username1: { [sequelize.Op.ne]: username }, username2: null, status: 0 } });
  if (duel) {
    duel.username2 = username;
    await duel.save();
    return duel;
  }
  // if no duel found, create new duel
  else {
    const newDuel = new db.Duel({ username1: username, username2: null, status: 0 });
    await newDuel.save();
    return newDuel;
  }
}

async function update(id, params) {

  const duel = await getDuel(id);

  // copy params to user and save
  Object.assign(duel, params);
  await duel.save();
}


async function _delete(id) {
  const duel = await getDuel(id);
  await duel.destroy();
}

// helper functions

async function getDuel(id) {
  const duel = await db.Duel.findByPk(id);
  if (!duel) throw "Duel not found";
  return duel;
}
