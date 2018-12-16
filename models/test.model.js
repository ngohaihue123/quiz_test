const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const testSchema = new Schema({
    title: String,
    // teacher: { type: Schema.Types.ObjectId, ref: "Manager" },
    time: Number,
    dateCreate: { type: Date, default: new Date() },
    isActived: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    fileTest: String,
    answer: [],
    class: Number,
    numberQuesttion: Number

}, {
        colection: "test",

    })
mongoose.model("Test", testSchema);