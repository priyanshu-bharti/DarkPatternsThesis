import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Tweets } from "../models/Tweets";

export const getAllTweets = async (req: Request, res: Response) => {
    const allTweets = await Tweets.find();
    res.status(200).json({ status: "success", data: allTweets });
};

export const findOneTweet = async (req: Request, res: Response) => {
    const tweetID = req.params.tweet_id;
    const tweet = await Tweets.findOne({ tweet_id: tweetID });

    if (tweet) res.status(200).json({ status: "success", data: tweet });
    else res.status(404).json({ status: "success", data: "not found" });
};

export const createTweet = async (req: Request, res: Response) => {
    const tweet = new Tweets({
        tweet_id: uuidv4(),
        embed_url: req.body.embed_url,
    });

    tweet.save().then(() => {
        return res.status(200).json({
            status: "Success",
            message: "successfully saved to database",
        });
    });
};

export const deleteTweet = async (req: Request, res: Response) => {
    const tweetID = req.params.tweet_id;
    const deleted = await Tweets.findOneAndDelete({
        tweet_id: tweetID,
    });
    if (deleted) res.status(200).json({ status: "success", data: deleted });
    else res.status(404).json({ status: "success", data: "not found" });
};
