import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TeacherSchema = new Schema(
  {
    name: { type: String, required: false },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course", require: false, default: [] }],
    isActive: { type: Boolean, require: false, default: true },

  },
  { timestamps: true }
);

export default mongoose.model("Teacher", TeacherSchema);
