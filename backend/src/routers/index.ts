import { authRouter } from "./AuthRouter.ts";
import exampleRouter from "./ExamplesRouter.ts";
import postRouter from "./PostsRouter.ts";
import statisticsRouter from "./StatisticsRouter.ts";
import tweetsRouter from "./TweetsRouter.ts";
import express from "express";

export const mainRouter = express.Router();

mainRouter.use("/examples", exampleRouter);
mainRouter.use("/posts", postRouter);
mainRouter.use("/statistics", statisticsRouter);
mainRouter.use("/tweets", tweetsRouter);
mainRouter.use("/login", authRouter);
