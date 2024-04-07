const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const friendService = require("./friend.service");

// routes

router.get("/", getAll);
router.get("/:id", getById);
router.get('/user/:username', getByUsername);
router.post("/", createSchema, create);
router.put("/accept", updateSchema, accept);
router.put("/refuse", updateSchema, refuse);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  friendService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  friendService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function getByUsername(req, res, next) {
  friendService
    .getByUsername(req.params.username)
    .then((user) => res.json(user))
    .catch(next);
}

function create(req, res, next) {
  friendService
    .create(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function accept(req, res, next) {
  friendService
    .accept(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function refuse(req, res, next) {
  friendService
    .refuse(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function update(req, res, next) {
  friendService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "User updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  friendService
    .delete(req.params.id)
    .then(() => res.json({ message: "User deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    username1: Joi.string(),
    username2: Joi.string(),
    status: Joi.string().empty("pending"),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    username1: Joi.string().empty(""),
    username2: Joi.string().empty(""),
    status: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}