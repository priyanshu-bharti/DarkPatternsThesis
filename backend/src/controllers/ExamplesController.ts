import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Examples } from "../models/Examples.ts";

export const getAllExamples = async (req: Request, res: Response) => {
    const allExamples = await Examples.find();
    res.status(200).json({ status: "success", data: allExamples });
};

export const findOneExample = async (req: Request, res: Response) => {
    const exampleID = req.params.example_id;
    const example = await Examples.findOne({ example_id: exampleID });

    if (example) res.status(200).json({ status: "success", data: example });
    else res.status(404).json({ status: "success", data: "not found" });
};

export const updateExample = async (req: Request, res: Response) => {
    const exampleID = req.params.example_id;
    const obj = {
        example_id: exampleID,
        category: req.body.category,
        domain: req.body.domain,
        description: req.body.description,
        image: req.body.image,
    };
    const updated = await Examples.updateOne({ example_id: exampleID }, obj);
    if (updated) res.status(200).json({ status: "success", data: obj });
    else res.status(404).json({ status: "success", data: "not found" });
};

export const deleteExample = async (req: Request, res: Response) => {
    const exampleID = req.params.example_id;
    const deleted = await Examples.findOneAndDelete({
        example_id: exampleID,
    });
    if (deleted) res.status(200).json({ status: "success", data: deleted });
    else res.status(404).json({ status: "success", data: "not found" });
};

export const createExample = (req: Request, res: Response) => {
    const example = new Examples({
        example_id: uuidv4(),
        category: req.body.category,
        domain: req.body.domain,
        description: req.body.description,
        image: req.body.image,
    });
    example.save().then(() => {
        return res.status(200).json({
            status: "Success",
            message: "successfully saved to database",
        });
    });
};
