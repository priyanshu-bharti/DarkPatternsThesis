import { Request, Response } from "express";
import { Statistics } from "../models/Statistics";

export const getAllStatistics = async (req: Request, res: Response) => {
    try {
        const allStatistics = await Statistics.find();
        if (allStatistics)
            res.status(200).json({ status: "success", data: allStatistics });
    } catch (err: any) {
        res.status(404).json({
            status: "failed",
            message: "something went wrong",
        });
    }
};

export const findStatistic = async (req: Request, res: Response) => {
    const url = req.query.url;
    console.log("hello world ",url);
    const statistic = await Statistics.findOne({ url: url });

    if (statistic) res.status(200).json({ status: "success", data: statistic });
    else res.status(404).json({ status: "success", data: "not found" });
};

export const createStatistic = async (req: Request, res: Response) => {
    const statistic = new Statistics({
        url: req.body.url,
        dark_pattern_count: req.body.dark_pattern_count,
        website_score: req.body.website_score,
        word_cloud: req.body.word_cloud,
    });
    statistic.save().then(() => {
        return res.status(200).json({
            status: "Success",
            message: "successfully saved to database",
        });
    });
};

export const upsertStatistic = async (req: Request, res: Response) => {
    const query = { url: req.body.url };
    const update = {
        dark_pattern_count: req.body.dark_pattern_count,
        website_score: req.body.website_score,
        word_cloud: req.body.word_cloud,
    };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const statistic = await Statistics.findOneAndUpdate(query, update, options);
    return res.status(200).json({
        status: "Success",
        message: "successfully saved to database",
    });
};

export const deleteStatistic = async (req: Request, res: Response) => {
    const url = req.params.url;
    const deleted = await Statistics.findOneAndDelete({
        url: url,
    });
    if (deleted) res.status(200).json({ status: "success", data: deleted });
    else res.status(404).json({ status: "success", data: "not found" });
};
