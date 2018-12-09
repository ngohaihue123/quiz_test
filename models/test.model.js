const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const testSchema = new Schema({
    tile: String,
    teacher: { type: Schema.Types.ObjectId, ref: "Manager" },
    time: Number,
    dateCreate: { type: Date, default: new Date() },
    isActive: { type: Boolean, default: true },
    fileTest: String,

}, {
        colection: "test",

    })
mongoose.model("Test", testSchema);