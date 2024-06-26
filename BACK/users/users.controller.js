﻿const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const userService = require("./user.service");

// routes

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function create(req, res, next) {
  userService
    .create(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "User updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({ message: "User deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    firstname: Joi.string(),
    lastname: Joi.string(),
    username: Joi.string(),
    imageUrl: Joi.string(),
    lives: Joi.number(),
    coins: Joi.number(),
    role: Joi.string(),
    level: Joi.number(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().empty(""),
    firstname: Joi.string().empty(""),
    lastname: Joi.string().empty(""),
    username: Joi.string().empty(""),
    imageUrl: Joi.string().empty(""),
    lives: Joi.number().empty(3),
    coins: Joi.number().empty(0),
    role: Joi.string().empty("user"),
    level: Joi.number().empty(1),

  });
  validateRequest(req, next, schema);
}