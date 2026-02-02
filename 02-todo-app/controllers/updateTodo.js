//import model
const Todo = require("../models/todo");

//define route handler
exports.updateTodo = async (req, res) => {
  try {
    const {id}=req.params;
    const{title,description}=req.body;
    const todo=await Todo.findByIdAndUpdate(
        id,
        {title,description,updatedAt:Date.now()},
        { new: true }
    )
    res.status(200).json({
        success:true,
        data:todo,
         message: "updated successfully.",
    })
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
