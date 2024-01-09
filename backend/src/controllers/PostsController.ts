import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Posts } from "../models/Posts";
import fs from "fs";

// function to encode file data to base64 encoded string
function base64_encode(file: string): string {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString("base64");
}

export const getAllPosts = async (req: Request, res: Response) => {
    const posts = await Posts.find();
        const allPosts = posts.map((post) => {
            const image = base64_encode(post.image ?? "");
            return {
                post_id: post.post_id,
                url: post.url,
                category: post.category,
                short_description: post.short_description,
                long_description: post.long_description,
                published: post.published,
                image: image,
            };
        });
    
    res.status(200).json({ status: "success", data: allPosts });
};

export const findOnePost = async (req: Request, res: Response) => {
    const postID = req.params.post_id;
    const post = await Posts.findOne({ post_id: postID });

    if (post) res.status(200).json({ status: "success", data: post });
    else res.status(404).json({ status: "success", data: "not found" });
};

export const updatePost = async (req: Request, res: Response) => {
    const postID = req.params.post_id;
    const obj = {
        post_id: postID,
        image: req.body.image,
        url: req.body.url,
        category: req.body.category,
        short_description: req.body.short_description,
        long_description: req.body.long_description,
        published: req.body.published,
    };
    const updated = await Posts.updateOne({ post_id: postID }, obj);
    if (updated) res.status(200).json({ status: "success", data: obj });
    else res.status(404).json({ status: "success", data: "not found" });
};

export const deletePost = async (req: Request, res: Response) => {
    const postID = req.params.post_id;
    const deleted = await Posts.findOneAndDelete({ post_id: postID });
    if (deleted) res.status(200).json({ status: "success", data: deleted });
    else res.status(404).json({ status: "success", data: "not found" });
};

export const getAllPublishedPosts = async (req: Request, res: Response) => {
    try {
        const publishedPosts = await Posts.find({ published: true });
        const newPublishedPosts = publishedPosts.map((publishedPost) => {
            const image = base64_encode(publishedPost.image ?? "");
            return {
                post_id: publishedPost.post_id,
                url: publishedPost.url,
                category: publishedPost.category,
                short_description: publishedPost.short_description,
                long_description: publishedPost.long_description,
                image: image,
            };
        });

        res.status(200).json({ status: "success", data: newPublishedPosts });
    } catch (error: any) {
        res.status(500).json({
            status: "failed",
            message: "something went wrong",
        });
    }
};

export const createPost = async (req: Request, res: Response) => {
    console.log("file upload details", req.file);
    console.log("other data", req.body);

    const post = new Posts({
        post_id: uuidv4(),
        image: req.file?.path,
        url: req.body.url,
        category: req.body.category,
        short_description: req.body.short_description,
        long_description: req.body.long_description,
        published: false,
    });
    console.log("post object", post);

    post.save().then(() => {
        return res.status(200).json({
            status: "Success",
            message: "successfully saved to database",
        });
    });
};

export const uploadPost = async (req: Request, res: Response) => {};
