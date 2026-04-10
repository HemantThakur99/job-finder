import express from "express";
import connectDB from "../backend/database/newDbConnection.js";
import jobRouter from "../backend/routes/jobRoutes.js";
import userRouter from "../backend/routes/userRoutes.js";
import applicationRouter from "../backend/routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "../backend/middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";

// Load environment variables
config({ path: "./backend/config/newConfig.env" });

const app = express();

// Cloudinary configuration with error handling
try {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
    api_key: process.env.CLOUDINARY_API_KEY || "",
    api_secret: process.env.CLOUDINARY_API_SECRET || "",
  });
} catch (error) {
  console.error("Cloudinary config error:", error.message);
}

// CORS configuration for Vercel
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// API routes (already prefixed with /api/v1)
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Connect to database
try {
  connectDB();
} catch (error) {
  console.error("Database connection error:", error.message);
}

// Error handling middleware
app.use(errorMiddleware);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Serverless function is working",
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Root endpoint for debugging
app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "Job Portal API is running",
    version: "1.0.0",
    endpoints: ["/api/v1/user", "/api/v1/job", "/api/v1/application", "/health"]
  });
});

// Export for Vercel serverless
export default app;
