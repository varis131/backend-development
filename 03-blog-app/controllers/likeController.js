const Like = require("../models/likeModel");
const Post = require("../models/postModel");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;

    // prevent duplicate like
    const alreadyLiked = await Like.findOne({ post, user });
    if (alreadyLiked) {
      return res.status(400).json({
        success: false,
        message: "Post already liked by this user",
      });
    }

    // create like
    const savedLike = await Like.create({ post, user });

    // push like into post
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } }, // ✅ FIXED
      { new: true },
    ).populate("likes");

    return res.status(201).json({
      success: true,
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while liking post",
    });
  }
};

//unlike a post
exports.unlikePost = async (req, res) => {
  try {
    //fetch karo post and like ko
    const { post, like } = req.body;
    //delete from liked post
    const deletedLike = await Like.findOneAndDelete({
      post: post,
      _id: like,
    });

    //update post collection also
    const updatedLike = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deletedLike._id } },
      { new: true },
    );

    return res.status(201).json({
      success: true,
      post: updatedLike,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while unliking post",
    });
  }
};
