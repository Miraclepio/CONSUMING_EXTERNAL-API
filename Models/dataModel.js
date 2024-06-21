const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    UserId: {
        type: Number,
    },
    postId: {
        type: Number,
    },
    title: {
        type: String,
        required: [true, " title is required"]
    },
    body: {
        type: String,
        required: [true, "body is required"]
    },
   

}, { timestamps: true });

const dataModel = mongoose.model("data", dataSchema);

module.exports = dataModel; 
