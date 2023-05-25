import express from "express";
import postsModel from '../models/posts.js';
import {parsePostBody} from "../helperFunctions/postHelpers.js";


const router = express.Router();

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        const post = await postsModel.getPostById(id);
        if (post) {
            res.status(200).json({post})
        }
    } catch (err) {
        res.status(404).json({message: "Post Does not exist"});
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
            message = "blah";
            console.log(message);
            res.status(200).json(message);
        } else {
            message = "Server error creating post";
            res.status(500).json(message);
        }
    } catch (err) {
        message = "Server error creating post";
        res.status(500).json(message);
    }
})


export default router;