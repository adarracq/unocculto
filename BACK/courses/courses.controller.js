const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const courseService = require("./course.service");

// routes

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  courseService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  courseService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function create(req, res, next) {
  courseService
    .create(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function update(req, res, next) {
  courseService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "Course updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  courseService
    .delete(req.params.id)
    .then(() => res.json({ message: "Course deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    imageUrl: Joi.string(),
    dateStart: Joi.number(),
    dateEnd: Joi.number(),
    themeId: Joi.number(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().empty(""),
    description: Joi.string().empty(""),
    imageUrl: Joi.string().empty(""),
    dateStart: Joi.number().empty(""),
    dateEnd: Joi.number().empty(""),
    themeId: Joi.number().empty(""),
  });
  validateRequest(req, next, schema);
}