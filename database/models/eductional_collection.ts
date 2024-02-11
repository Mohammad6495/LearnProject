import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EductionalSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    isActive: { type: Boolean, require: false, default: true },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course", require: false, default: [] }]
  },
  { timestamps: true }
);

export default mongoose.model("Eductional", EductionalSchema);
