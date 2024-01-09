import express from "express";
import {
    deleteExample,
    findOneExample,
    getAllExamples,
    createExample,
    updateExample,
} from "../controllers/ExamplesController.ts";
import { verifyToken } from "../middleware/authMiddleware.ts";

const exampleRouter = express.Router();

exampleRouter.get("/", getAllExamples);
exampleRouter.post("/", verifyToken, createExample);
exampleRouter.get("/:example_id", findOneExample);
exampleRouter.put("/:example_id",verifyToken, updateExample);
exampleRouter.delete("/:example_id",verifyToken, deleteExample);

export default exampleRouter;
