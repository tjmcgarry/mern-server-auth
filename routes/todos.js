const express = require("express");
const {
  createTodo,
  getTodos,
  getTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// GET todos
router.get("/", getTodos);

//GET todo
router.get("/:id", getTodo);

// POST todo
router.post("/", createTodo);

// DELETE todo
router.delete("/:id", deleteTodo);

// PATCH todo
router.patch("/:id", updateTodo);

module.exports = router;
