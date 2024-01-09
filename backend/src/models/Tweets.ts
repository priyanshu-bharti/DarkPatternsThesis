import mongoose from "mongoose";

const tweetsSchema = new mongoose.Schema({
    tweet_id: String,
    embed_url: String,
});

export const Tweets = mongoose.model('Tweets',tweetsSchema);
