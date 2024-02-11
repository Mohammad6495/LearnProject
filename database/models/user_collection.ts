import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, require: true},
    lastName: { type: String, require: true },
    token: { type: String, require: false },
    nikname: { type: String, require: true },
    userName: {type: String, require: true},
    password: { type: String, require: true },
    role: [{ type: Schema.Types.ObjectId, ref: "Role" }],
}, {
    timestamps: true
});
export default mongoose.model("User", userSchema);