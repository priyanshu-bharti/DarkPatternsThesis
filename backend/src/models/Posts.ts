import mongoose from "mongoose";
const postsSchema = new mongoose.Schema({
    post_id: String,
    image: String,
    url: String,
    category: String,
    short_description: String,
    long_description: String,
    published: Boolean,
});
export const Posts = mongoose.model("Posts", postsSchema);
