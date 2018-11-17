const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    gmail: String,
    password: String,
    class: Number,
    school: String,
    isActive: { type: Boolean, default: true },
    tokens: [{
        access: { type: String, require: true },
        token: { type: String, require: true }
    }],
    dateCreate: { type: Date, default: new Date() }
},
    {
        collection: "users"

    });
mongoose.model("User", userSchema);