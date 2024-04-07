const db = require("../_helpers/db");

module.exports = {
  getAll,
  getByUsername,
  getById,
  create,
  accept,
  refuse,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Friend.findAll();
}

async function getByUsername(username) {
  const friends = await db.Friend.findAll({ where: { username1: username } });
  const friends2 = await db.Friend.findAll({ where: { username2: username } });
  console.log(friends);
  console.log(friends2);
  return friends.concat(friends2);
}

async function getById(id) {
  return await getFriend(id);
}

// 0 = success
// 1 = already friends
// 2 = same username
// 3 = already pending
// 4 = username not found

async function create(params) {
  // validate
  const _friend = await db.Friend.findOne({ where: { username1: params.username1, username2: params.username2, status: 'friends' } });
  const _friend2 = await db.Friend.findOne({ where: { username1: params.username2, username2: params.username1, status: 'friends' } });
  const exist = await db.User.findOne({ where: { username: params.username2 } });
  if (_friend || _friend2) {
    return 1;
  }
  else if (params.username1.toLowerCase() == params.username2.toLowerCase()) {
    return 2;
  }
  else if (await db.Friend.findOne({ where: { username1: params.username1, username2: params.username2, status: 'pending' } })) {
    return 3;
  }
  else if (!exist) {
    return 4;
  }
  else {
    const friend = new db.Friend(params);
    // save friend
    await friend.save();
    return 0;
  }
}

async function accept(params) {
  const friend = await db.Friend.findOne({ where: { username1: params.username2, username2: params.username1, status: 'pending' } });
  if (friend) {
    friend.status = 'friends';
    await friend.save();
  }
  else {
    return 1;
  }
}

async function refuse(params) {
  const friend = await db.Friend.findOne({ where: { username1: params.username2, username2: params.username1, status: 'pending' } });
  if (friend) {
    await friend.destroy();
  }
  else {
    return 1;
  }
}

async function update(id, params) {

  const friend = await getFriend(id);

  // copy params to user and save
  Object.assign(friend, params);
  await friend.save();
}


async function _delete(id) {
  const friend = await getFriend(id);
  await friend.destroy();
}

// helper functions

async function getFriend(id) {
  const friend = await db.Friend.findByPk(id);
  if (!friend) throw "Friend not found";
  return friend;
}
