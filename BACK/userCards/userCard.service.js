const db = require("../_helpers/db");

module.exports = {
  getAll,
  getById,
  getByUserEmail,
  create,
  update,
  restart,
  addLevel,
  delete: _delete,
};

async function getAll() {
  return await db.UserCard.findAll();
}

async function getById(id) {
  return await getUserCard(id);
}

async function getByUserEmail(userEmail) {
  return await db.UserCard.findAll({ where: { userEmail: userEmail } });
}

async function create(params) {
  console.log(params);
  // validate
  if (await db.UserCard.findOne({ where: { userEmail: params.userEmail, questionId: params.questionId } })) {
    //throw 'Email "' + params.email + '" is already registered';
    return await db.UserCard.findOne({ where: { userEmail: params.userEmail, questionId: params.questionId } });
  }
  else {
    const userCard = new db.UserCard(params);
    // save userCard
    await userCard.save();
    return userCard;
  }
}

async function update(id, params) {
  const userCard = await getUserCard(id);

  // copy params to userCard and save
  Object.assign(userCard, params);
  await userCard.save();
}

async function addLevel(id) {
  const userCard = await getUserCard(id);
  const newLevel = userCard.level + 1;
  let dayToAdd = 0;
  switch (newLevel) {
    case 1:
      dayToAdd = 1;
      break;
    case 2:
      dayToAdd = 3;
      break;
    case 3:
      dayToAdd = 7;
      break;
    case 4:
      dayToAdd = 14;
      break;
    case 5:
      dayToAdd = 30;
      break;
    default:
      dayToAdd = 1;
  }

  const newDate = new Date();
  newDate.setDate(newDate.getDate() + dayToAdd);
  // copy params to userCard and save
  Object.assign(userCard, { level: newLevel, nextReview: newDate });
  await userCard.save();
}

async function restart(id) {
  const userCard = await getUserCard(id);
  const newDate = new Date();
  newDate.setDate(newDate.getDate());
  // copy params to userCard and save
  Object.assign(userCard, { level: 0, nextReview: newDate });
  await userCard.save();
}


async function _delete(id) {
  const userCard = await getUserCard(id);
  await userCard.destroy();
}

// helper functions

async function getUserCard(id) {
  const userCard = await db.UserCard.findByPk(id);
  if (!userCard) throw "User card not found";
  return userCard;
}
