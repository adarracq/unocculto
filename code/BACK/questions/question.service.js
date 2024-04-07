const db = require("../_helpers/db");

module.exports = {
  getAll,
  getById,
  getByChapterId,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Question.findAll();
}

async function getById(id) {
  return await getQuestion(id);
}

async function getByChapterId(chapterId) {
  return await db.Question.findAll({ where: { chapterId: chapterId } });
}

async function create(params) {
  // validate
  if (await db.Question.findOne({ where: { question: params.question } })) {
    //throw 'Email "' + params.email + '" is already registered';
    return await db.Question.findOne({ where: { question: params.question } });
  }
  else {
    const question = new db.Question(params);
    // save question
    await question.save();
    return question;
  }
}

async function update(id, params) {
  const question = await getQuestion(id);

  // copy params to question and save
  Object.assign(question, params);
  await question.save();
}


async function _delete(id) {
  const question = await getQuestion(id);
  await question.destroy();
}

// helper functions

async function getQuestion(id) {
  const question = await db.Question.findByPk(id);
  if (!question) throw "Question not found";
  return question;
}
