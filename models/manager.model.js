const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    enums = require("../static/enum"),
    RoleType = enums.RoleType;
const managerSchema = new Schema({
    name: String,
    username: String,
    gmail: String,
    password: String,
    role: { type: RoleType, default: RoleType.Contributor },
    isActive: { type: Boolean, default: true }
}, {
        collection: "manager",
    }
)
mongoose.model("Manager", managerSchema);