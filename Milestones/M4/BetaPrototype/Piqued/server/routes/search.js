import express from "express";
import postsModel from '../models/posts.js';
import {sortPosts} from "../helperFunctions/postHelpers.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const type = req.query.by;
    let query = req.query.q.trim().split(" ");
    let results = [];
    let temp = [];
    let message;
    if (!type || !query) {
        res.status(500).json({message: "Server side error. Please try again."});
    } else {
        if (query.length > 0 && query[0] !== '') {
            if (type === "keyword") {
                results = await postsModel.searchPostsByKeyword(query[0]);
                for (let i = 1; i < query.length; i++) {
                    temp = results;
                    results = results.filter(result =>
                        result.title.toLowerCase().includes(query[i].toLowerCase())
                        || result.simpleText.toLowerCase().includes(query[i].toLowerCase())
                        || result.category.toLowerCase().includes(query[i].toLowerCase())
                        || result.displayName.toLowerCase().includes(query[i].toLowerCase()));
                    if (!results.length) {
                        results = temp;
                    }
                }
                results = sortPosts(results, query[0]);
            } else if (type === "tag") {
                results = await postsModel.searchPostsByHashTag(query[0]);
                results = sortPosts(results, "newest");
            }
            else if(type === "user"){
                results = await postsModel.getProfilePosts(query[0]);
                results = sortPosts(results, "newest");
            }
        }

        if (!results.length) {
            results = await postsModel.getNPosts(10);
            message = "No posts found. Here are some recent posts shared by others.";
        } else {
            message = "Your search produced " + results.length +
                (results.length == 1? " result.": " results.");
        }
        res.status(200).json({message, results});
    }
})

export default router;
