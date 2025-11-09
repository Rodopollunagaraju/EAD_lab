import mongoose from 'mongoose';

// Define your MongoDB Atlas connection URI
const URI = "mongodb+srv://sarvesh:98377389@cluster0.7hnfh72.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export async function connectDB() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(URI, { dbName: "studentdb" });
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.log("❌ Error connecting to database:", error);
  }
}
