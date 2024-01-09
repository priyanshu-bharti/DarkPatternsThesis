import express from "express";
import {
    createTweet,
    deleteTweet,
    findOneTweet,
    getAllTweets,
} from "../controllers/TweetsController";
import { verifyToken } from "../middleware/authMiddleware";

const tweetsRouter = express.Router();

tweetsRouter.get("/", getAllTweets);
tweetsRouter.get("/:tweet_id", findOneTweet);
tweetsRouter.post("/",verifyToken, createTweet);
tweetsRouter.delete("/:tweet_id",verifyToken, deleteTweet);

export default tweetsRouter;
