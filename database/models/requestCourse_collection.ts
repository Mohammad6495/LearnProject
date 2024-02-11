import mongoose from "mongoose";

const Schema = mongoose.Schema;

const requestCourseSchema = new Schema({
    phoneNumber: { type: String, require: true },
    favoriotArea: { type: String, require: false },
    course: { type: Schema.Types.ObjectId, ref: "Course", require: true },
    isActive: { type: Boolean, require: false, default: true },
    isAvailable: { type: Boolean, require: false, default: true },
}, {
    timestamps: true
});
export default mongoose.model("RequestCourse", requestCourseSchema);