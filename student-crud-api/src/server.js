import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import studentRoutes from "./routes/students.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);

// Health check
app.get("/", (_req, res) => res.send("Student CRUD API is running")); 

// Start
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;

connectDB(URI).then(() => {
  app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
});

