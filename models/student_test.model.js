const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const studentTestSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: "User" },
    test: { type: Schema.Types.ObjectId, ref: "Test" },
    dateCreate: { type: Date, default: new Date() },
    isActived: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    answer: [],
    result: Number

}, {
        colection: "studentTests",

    })
mongoose.model("StudentTest", studentTestSchema);