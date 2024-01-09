import express from "express";
import { authController,authUserMaker } from "../controllers/AuthController";

export const authRouter = express.Router();

authRouter.post("/", authController);
authRouter.get("/create",authUserMaker);