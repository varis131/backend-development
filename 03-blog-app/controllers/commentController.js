const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComment = async (req, res) => {
  try {
    const { user, post, body } = req.body;

    // create & save comment
    const comment = await Comment.create({
      user,
      post,
      body,
    });

    // push comment into post
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: comment._id } },
      { new: true }
    ).populate("comments");

    return res.status(201).json({
      success: true,
      post: updatedPost,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating comment",
    });
  }
};
