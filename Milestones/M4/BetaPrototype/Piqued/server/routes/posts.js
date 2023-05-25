import express from "express";
import postsModel from '../models/posts.js';
import {parsePostBody} from "../helperFunctions/postHelpers.js";
import commentsModel from "../models/comments.js";


const router = express.Router();

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        const post = await postsModel.getPostById(id);
        post.comments = await commentsModel.getPostComments(post.postId)
        if (post) {
            res.status(200).json({post})
        }
    } catch (err) {
        res.status(404).json({message: "Post Does not exist"});
    }
})

router.post("/:id/create-comment",async (req,res) => {
    let comment;
    let userid;
    let postid = req.params.id;

    try {
        const addComment = await commentsModel.createComment(userid,postid,comment);
        res.status(200).json({message: "Post Created."});

    }catch (err)  {
        res.status(500).json({message: "Error creating comment"})
    }
})

router.post("/create-post", async (req, res) => {
    let title;
    let tags = "Read,Watch,Laugh"
    let tagsSplit = tags.split(",");
    let body;
    let body_unformatted;
    let author;
    let wordCount;
    let message;

    body_unformatted = parsePostBody(body);
    wordCount = body_unformatted.split(" ").length;

    try {
        const createPost = await postsModel.create(1, "title", body,
            body_unformatted, 1, 1, null, wordCount, null, tagsSplit);
        if (createPost) {
            res.status(200);
        } else {
            message = "Server error creating post";
            res.status(500).json(message);
        }
    } catch (err) {
        message = "Server error creating post";
        res.status(500).json(message);
    }
})

router.get("/user/:username", async (req,res)=>{
    const userName = req.params.username;
    try {
        const usersPosts = await postsModel.getProfilePosts(userName)
        if(!usersPosts.length){
            res.status(404).json({message:"No posts found with this username"});
        }
        else{
            res.status(200).json(usersPosts);
        }
    }catch (err){
        res.status(500).json({message: "Server error."})
    }
})



export default router;