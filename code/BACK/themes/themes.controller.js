const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const themeService = require("./theme.service");

// routes

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  themeService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  themeService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function create(req, res, next) {
  themeService
    .create(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function update(req, res, next) {
  themeService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "Theme updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  themeService
    .delete(req.params.id)
    .then(() => res.json({ message: "Theme deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    title: Joi.string(),
    imageUrl: Joi.string(),
    logoUrl: Joi.string(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().empty(""),
    imageUrl: Joi.string().empty(""),
    logoUrl: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}