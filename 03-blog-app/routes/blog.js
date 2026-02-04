
const express=require("express");

const router=express.Router();

//import controller 
const { createComment } = require("../controllers/commentController");
const {createPosts,getAllPosts}=require("../controllers/postController");
const {likePost,unlikePost}=require("../controllers/likeController")


//mapping kardo (fegfine api routes)
router.post("/comments/create",createComment);
router.post("/posts/create",createPosts);
router.post("/likes/like",likePost);
router.post("/likes/unlike",unlikePost);
router.get("/get/posts",getAllPosts);


//export router
module.exports=router;