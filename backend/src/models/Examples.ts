import mongoose from "mongoose";
const examplesSchema = new mongoose.Schema({
    example_id: String,
    category: String,
    domain: String,
    description: String,
    image: String,
});
export const Examples = mongoose.model("Examples", examplesSchema);