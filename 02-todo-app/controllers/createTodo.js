//import karo model(schema) ko
const Todo = require("../models/todo");

//define route handler
exports.createTodo = async (req, res) => {
  try {
    //extract title and description from request body
    const { title, description } = req.body;
    //create a todo object and insert it into DB
    const response = await Todo.create({ title, description });

    //send a json response with a success flag
    res.status(200).json({
      success: true,
      data: response,
      message: "entry created successfully",
    });
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: error.message,
    });
  }
};
