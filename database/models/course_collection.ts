import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        title: { type: String, required: true },
        periodTime: { type: String, required: true },
        dayHolding: { type: String, required: false },
        timeHolding: { type: String, required: false },
        image: { type: String, required: false },
        description: { type: String, required: false },
        courseConditions: { type: String, required: false },
        viewCount: { type: Number, required: false, default: 1 },
        price: { type: Number, required: true },
        startTime: { type: Date, required: false },
        isActive: { type: Boolean, require: false, default: true },
        isAvailable: { type: Boolean, require: false, default: true },
        teacher: { type: Schema.Types.ObjectId, ref: "Teacher", require: true },
        category: { type: Schema.Types.ObjectId, ref: "Category" , require: true},
        eductional: { type: Schema.Types.ObjectId, ref: "Eductional" , require: true},
        headLines: [{ type: String, require: false}],
    },
    { timestamps: true }
);

export default mongoose.model("Course", CourseSchema);
