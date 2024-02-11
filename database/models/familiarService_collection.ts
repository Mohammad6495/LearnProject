import mongoose from "mongoose";

const Schema = mongoose.Schema;

const familiarServiceSchema = new Schema({
    phoneNumber: { type: String, require: true },
    favoriotArea: { type: String, require: false },
}, {
    timestamps: true
});
export default mongoose.model("FamiliarService", familiarServiceSchema);