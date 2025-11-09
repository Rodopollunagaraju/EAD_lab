import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rollNo: { type: String, required: true, unique: true, trim: true },
    branch: { type: String, required: true, enum: ["IT", "CSE", "ECE", "EEE", "ME", "CE"], },
    year: { type: Number, required: true, min: 1, max: 4 },
    email: { type: String, required: true, lowercase: true, match: /.+@.+\..+/ },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
