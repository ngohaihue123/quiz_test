const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: String,
    gmail: String,
    password: String,
    isActive: { type: Boolean, default: true },
    tokens: [{
        access: { type: String, require: true },
        token: { type: String, require: true }
    }],
    dateCreate: { type: Date, default: new Date() }
},
    {
        collection: "teachers"

    });
mongoose.model("Teacher", teacherSchema);