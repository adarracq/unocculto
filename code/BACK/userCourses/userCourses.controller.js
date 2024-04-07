﻿const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const userCourseService = require("./userCourse.service");

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
  userCourseService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  userCourseService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function getByUserEmail(req, res, next) {
  userCourseService
    .getByUserEmail(req.params.userEmail)
    .then((user) => res.json(user))
    .catch(next);
}

function create(req, res, next) {
  userCourseService
    .create(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function update(req, res, next) {
  userCourseService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "User Chapter updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  userCourseService
    .delete(req.params.id)
    .then(() => res.json({ message: "User chapter deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    userEmail: Joi.string().required(),
    courseId: Joi.number().required(),
    status: Joi.string(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    userEmail: Joi.string().empty(""),
    courseId: Joi.number().empty(""),
    status: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}