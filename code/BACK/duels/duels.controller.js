const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const duelService = require("./duel.service");

// routes

router.get("/", getAll);
router.get("/:id", getById);
router.get('/user/:username', getByUsername);
router.post("/join/:username", join);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  duelService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  duelService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function getByUsername(req, res, next) {
  duelService
    .getByUsername(req.params.username)
    .then((user) => res.json(user))
    .catch(next);
}

function create(req, res, next) {
  duelService
    .create(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function join(req, res, next) {
  duelService
    .join(req.params.username)
    .then((user) => res.json(user))
    .catch(next);
}

function update(req, res, next) {
  console.log("update");
  console.log(req.body);
  console.log(req.params.id);
  duelService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "Duel updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  duelService
    .delete(req.params.id)
    .then(() => res.json({ message: "Duel deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    username1: Joi.string().required(),
    username2: Joi.string(),
    results: Joi.array(),
    status: Joi.number().empty(0),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    username1: Joi.string().empty(""),
    results: Joi.array(),
    status: Joi.number().empty(0),
  });
  validateRequest(req, next, schema);
}