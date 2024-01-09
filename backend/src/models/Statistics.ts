import mongoose from "mongoose"
const statisticsSchema = new mongoose.Schema({
    url:String,
    dark_pattern_count:Number,
    website_score:Number,
    word_cloud:String,
})
export const Statistics = mongoose.model('Statistics',statisticsSchema);
