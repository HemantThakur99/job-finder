import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

// Load environment variables
config();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://hemantthakur0888_db_user:Q5m96Jmieakx7Fwm@cluster0.oknp0kx.mongodb.net/jobPortal?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

// Connect to database
connectDB();

// Basic routes for testing
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Serverless function is working",
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "Job Portal API is running",
    version: "1.0.0",
    endpoints: ["/health"]
  });
});

// Export for Vercel serverless
export default app;
