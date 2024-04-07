const db = require("../_helpers/db");

module.exports = {
  getAll,
  getByDuelId,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.DuelAnswer.findAll();
}

async function getByDuelId(duelId) {
  return await db.DuelAnswer.findAll({ where: { duelId: duelId } });
}

async function getById(id) {
  return await getDuelAnswer(id);
}

async function create(params) {

  const duelAnswer = new db.DuelAnswer(params);
  // save duel
  await duelAnswer.save();
  return duelAnswer;

}

async function update(id, params) {

  const duelAnswer = await getDuelAnswer(id);

  // copy params to user and save
  Object.assign(duelAnswer, params);
  await duelAnswer.save();
}


async function _delete(id) {
  const duelAnswer = await getDuelAnswer(id);
  await duelAnswer.destroy();
}

// helper functions

async function getDuelAnswer(id) {
  const duelAnswer = await db.DuelAnswer.findByPk(id);
  if (!duelAnswer) throw "duelAnswer not found";
  return duelAnswer;
}
