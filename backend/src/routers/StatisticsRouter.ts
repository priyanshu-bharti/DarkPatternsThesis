import express from "express";
import {
    createStatistic,
    deleteStatistic,
    findStatistic,
    getAllStatistics,
    upsertStatistic,
} from "../controllers/StatisticsController";

const statisticsRouter = express.Router();

statisticsRouter.post("/", createStatistic);
statisticsRouter.get("/all", getAllStatistics);
statisticsRouter.post("/upsert", upsertStatistic);
statisticsRouter.get("/",findStatistic);
statisticsRouter.delete("/:url", deleteStatistic);

export default statisticsRouter;
