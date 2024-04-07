const db = require("../_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Course.findAll();
}

async function getById(id) {
  return await getCourse(id);
}

async function create(params) {
  // validate
  if (await db.Course.findOne({ where: { title: params.title } })) {
    //throw 'Email "' + params.email + '" is already registered';
    return await db.Course.findOne({ where: { title: params.title } });
  }
  else {
    const course = new db.Course(params);
    // save course
    await course.save();
    return course;
  }
}

async function update(id, params) {
  const course = await getCourse(id);

  // copy params to course and save
  Object.assign(course, params);
  await course.save();
}


async function _delete(id) {
  const course = await getCourse(id);
  await course.destroy();
}

// helper functions

async function getCourse(id) {
  const course = await db.Course.findByPk(id);
  if (!course) throw "Course not found";
  return course;
}
