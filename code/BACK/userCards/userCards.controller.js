const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const userCardService = require("./userCard.service");

// routes

router.get("/", getAll);
router.get("/:id", getById);
router.get("/user/:userEmail", getByUserEmail);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.put("/addLevel/:id", updateSchema, addLevel);
router.put("/restart/:id", updateSchema, restart);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  userCardService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  userCardService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function getByUserEmail(req, res, next) {
  userCardService
    .getByUserEmail(req.params.userEmail)
    .then((user) => res.json(user))
    .catch(next);
}

function create(req, res, next) {
  userCardService
    .create(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function update(req, res, next) {
  userCardService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "User card updated" }))
    .catch(next);
}

function addLevel(req, res, next) {
  userCardService
    .addLevel(req.params.id)
    .then(() => res.json({ message: "Level updated" }))
    .catch(next);
}

function restart(req, res, next) {
  userCardService
    .restart(req.params.id)
    .then(() => res.json({ message: "User card restarted" }))
    .catch(next);
}

function _delete(req, res, next) {
  userCardService
    .delete(req.params.id)
    .then(() => res.json({ message: "Use card deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    userEmail: Joi.string().required(),
    questionId: Joi.number().required(),
    nextReview: Joi.date(),
    level: Joi.number(),
    themeId: Joi.number(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    userEmail: Joi.string().empty(""),
    questionId: Joi.number().empty(""),
    nextReview: Joi.date().empty(""),
    level: Joi.number().empty(""),
    themeId: Joi.number().empty(""),
  });
  validateRequest(req, next, schema);
}