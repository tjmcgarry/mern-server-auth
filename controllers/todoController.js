const Todo = require("../models/todoModel");
const mongoose = require("mongoose");

// GET todos
const getTodos = async (req, res) => {
  const user_id = req.user._id;
  const todos = await Todo.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(todos);
};

// GET todo
const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such todo" });
  }

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({ error: "No such todo" });
  }

  res.status(200).json(todo);
};

// POST todo
const createTodo = async (req, res) => {
  const { title, description } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in both fields", emptyFields });
  }

  // ADD to mongodb
  try {
    const user_id = req.user._id;
    const todo = await Todo.create({ title, description, user_id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such todo" });
  }

  const todo = await Todo.findOneAndDelete({ _id: id });

  if (!todo) {
    return res.status(400).json({ error: "No such todo" });
  }

  res.status(200).json(todo);
};

// PATCH todo
const updateTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such todo" });
  }

  const todo = await Tood.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!todo) {
    return res.status(400).json({ error: "No such todo" });
  }

  res.status(200).json(todo);
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo,
};
