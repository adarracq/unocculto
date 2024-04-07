const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const userChapterService = require("./userChapter.service");

// routes

router.get("/", getAll);
router.get("/:id", getById);
router.get("/user/:userEmail", getByUserEmail);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  userChapterService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  userChapterService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function getByUserEmail(req, res, next) {
  userChapterService
    .getByUserEmail(req.params.userEmail)
    .then((user) => res.json(user))
    .catch(next);
}

function create(req, res, next) {
  userChapterService
    .create(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function update(req, res, next) {
  userChapterService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "User Chapter updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  userChapterService
    .delete(req.params.id)
    .then(() => res.json({ message: "User chapter deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    userEmail: Joi.string().required(),
    chapterId: Joi.number().required(),
    courseId: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    userEmail: Joi.string().empty(""),
    chapterId: Joi.number().empty(""),
    courseId: Joi.number().empty(""),
  });
  validateRequest(req, next, schema);
}