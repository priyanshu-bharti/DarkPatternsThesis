// Importing the required packages for creating a server.
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { mainRouter } from "./routers/index.ts";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

// Create new express instance.
const app = express();
app.use(cors({origin:"*"}));
app.use(morgan("dev"));

// Specify the port number for our server.
const PORT = process.env.PORT_NUMBER || 5002;

// Using environment variables in our project.
dotenv.config();

// It autmatically parses the request POST or PUT
app.use(bodyParser.json());

// Connect to mongodb instance
mongoose.connect(process.env.MONGO_URI as string).then((result) => {
    console.log("connected to Mongoose");
    app.listen(PORT, () => {
        console.log("server has started on port");
        console.log("http://localhost:" + PORT);
    });
});

// Use our routers
app.use("/v1", mainRouter);
