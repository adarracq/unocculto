const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const questionService = require("./question.service");

// routes

router.get("/", getAll);
router.get("/:id", getById);
router.get("/chapter/:chapterId", getByChapterId);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  questionService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  questionService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function getByChapterId(req, res, next) {
  questionService
    .getByChapterId(req.params.userEmail)
    .then((user) => res.json(user))
    .catch(next);
}

function create(req, res, next) {
  questionService
    .create(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function update(req, res, next) {
  questionService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "Question updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  questionService
    .delete(req.params.id)
    .then(() => res.json({ message: "Question deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
    wrongAnswer1: Joi.string().required(),
    wrongAnswer2: Joi.string().required(),
    wrongAnswer3: Joi.string().required(),
    imageUrl: Joi.string(),
    chapterId: Joi.number(),
    courseId: Joi.number(),
    themeId: Joi.number(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    question: Joi.string().empty(""),
    answer: Joi.string().empty(""),
    wrongAnswer1: Joi.string().empty(""),
    wrongAnswer2: Joi.string().empty(""),
    wrongAnswer3: Joi.string().empty(""),
    imageUrl: Joi.string().empty(""),
    chapterId: Joi.number().empty(""),
    courseId: Joi.number().empty(""),
    themeId: Joi.number().empty(""),
  });
  validateRequest(req, next, schema);
}