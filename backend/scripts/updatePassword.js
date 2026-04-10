import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '../models/userSchema.js';
import dotenv from 'dotenv';

dotenv.config({ path: './config/newConfig.env' });

const updatePassword = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find jojo user
    const user = await User.findOne({ email: 'jojo@gmail.com' });
    
    if (!user) {
      console.log('User jojo not found');
      return;
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash('jojojojo', 10);
    
    // Update password
    user.password = hashedPassword;
    await user.save();

    console.log('Password updated for jojo');
    console.log('New credentials:');
    console.log('Email: jojo@gmail.com');
    console.log('Password: jojojojo');

  } catch (error) {
    console.error('Error updating password:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the function
updatePassword();
