import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { Student } from "./models/student.js";

dotenv.config();

const sample = [
  { name: "Raj Kumar", rollNo: "IT2025A002", branch: "IT", year: 2, email: "raj@example.com" },
  { name: "Sneha Reddy", rollNo: "CSE2025B010", branch: "CSE", year: 1, email: "sneha@example.com" },
  { name: "Aman Verma", rollNo: "ECE2025C005", branch: "ECE", year: 3, email: "aman@example.com" }
];

await connectDB(process.env.MONGODB_URI);
await Student.deleteMany({});
await Student.insertMany(sample);
console.log("✅ Seeded students");
process.exit(0);
