const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

/* findAll Todos */
router.get("/", todoController.findAll);

// create todo
router.post("/", todoController.create);

module.exports = router;
