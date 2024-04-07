const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const duelAnswerService = require("./duelAnswer.service");

// routes

router.get("/", getAll);
router.get("/:id", getById);
router.get('/duel/:duelId', getByDuelId);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  duelAnswerService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  duelAnswerService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function getByDuelId(req, res, next) {
  duelAnswerService
    .getByDuelId(req.params.duelId)
    .then((user) => res.json(user))
    .catch(next);
}

function create(req, res, next) {
  duelAnswerService
    .create(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function update(req, res, next) {
  duelAnswerService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "User updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  duelAnswerService
    .delete(req.params.id)
    .then(() => res.json({ message: "User deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    user1Answer: Joi.string(),
    user2Answer: Joi.string(),
    questionId: Joi.number().required(),
    duelId: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    user1Answer: Joi.string(),
    user2Answer: Joi.string(),
    questionId: Joi.number(),
    duelId: Joi.number(),
  });
  validateRequest(req, next, schema);
}