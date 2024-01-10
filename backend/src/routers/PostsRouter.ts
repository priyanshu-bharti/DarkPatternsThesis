import express from "express";
import {
    createPost,
    deletePost,
    findOnePost,
    getAllPosts,
    getAllPublishedPosts,
    publishPost,
    updatePost,
} from "../controllers/PostsController";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { verifyToken } from "../middleware/authMiddleware";

const postRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split("/")[1];
        return cb(null, `${uuidv4().toString()}.${extension}`);
    },
});

const upload = multer({ storage });

postRouter.get("/", getAllPublishedPosts);
postRouter.get("/all", verifyToken, getAllPosts);
postRouter.post("/", upload.single("file"), createPost);
postRouter.get("/:post_id", findOnePost);
postRouter.put("/publish/:post_id", publishPost);
postRouter.put("/:post_id", verifyToken, updatePost);
postRouter.delete("/:post_id", verifyToken, deletePost);

export default postRouter;
