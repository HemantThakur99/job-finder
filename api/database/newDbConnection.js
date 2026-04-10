import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// New Database Connection Setup
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error('Database Connection Error:', error.message);
    // Don't use process.exit in serverless
    // Just log the error and continue
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
  console.log('🚀 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected');
});

export default connectDB;
