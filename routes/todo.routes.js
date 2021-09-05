const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

/* findAll Todos */
router.get("/", todoController.findAll);

// create todo
router.post("/", todoController.create);

// findTodo By id
router.get("/:id", todoController.findOne);

// update id
router.put("/:id", todoController.update);

// delete todo
router.delete("/:id", todoController.delete);

module.exports = router;
