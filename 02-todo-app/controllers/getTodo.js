//import model
const Todo = require("../models/todo");

// get all todos
exports.getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({});
    return res.status(200).json({
      success: true,
      data: todos,
      message: "entire todo data is fetched",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "server error",
    });
  }
};

// get todo by id
exports.getTodoById = async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await Todo.findById(id);

    // ❗ agar data nahi mila
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "no data found with given id",
      });
    }

    // ✅ agar data mil gaya
    return res.status(200).json({
      success: true,
      data: todo,
      message: "data found with given id",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "server error",
    });
  }
};
