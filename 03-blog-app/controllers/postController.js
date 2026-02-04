const Post = require("../models/postModel");

exports.createPosts = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new Post({
      title,
      body,
    });

    const savedPosts = await post.save();
    return res.status(201).json({
      success: true,
      post: savedPosts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating post",
    });
  }
};

//get all the posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("likes").populate("comments");
    return res.status(201).json({
      success: true,
      posts,
      message:"fetched posts successfully."
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while frtching all post",
    });
  }
};
