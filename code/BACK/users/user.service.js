﻿const db = require("../_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.User.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function create(params) {
  // validate
  if (await db.User.findOne({ where: { email: params.email } })) {
    //throw 'Email "' + params.email + '" is already registered';
    return await db.User.findOne({ where: { email: params.email } });
  }
  else {
    // add random number after firstname
    params.username = params.firstname + Math.floor(Math.random() * 10000);
    const user = new db.User(params);
    // save user
    await user.save();
    return user;
  }
}

async function update(id, params) {

  const user = await getUser(id);

  // validate
  const emailChanged = params.email && user.email !== params.email;
  if (
    emailChanged &&
    (await db.User.findOne({ where: { email: params.email } }))
  ) {
    throw 'Email "' + params.email + '" is already registered';
  }

  // copy params to user and save
  Object.assign(user, params);
  await user.save();
}


async function _delete(id) {
  const user = await getUser(id);
  await user.destroy();
}

// helper functions

async function getUser(id) {
  const user = await db.User.findByPk(id);
  if (!user) throw "User not found";
  return user;
}
