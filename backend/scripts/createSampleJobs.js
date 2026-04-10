import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '../models/userSchema.js';
import { Job } from '../models/jobSchema.js';
import dotenv from 'dotenv';

dotenv.config({ path: '../config/newConfig.env' });

const createSampleData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create employer user "jojo"
    const existingUser = await User.findOne({ email: 'jojo@gmail.com' });
    
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      
      const jojoUser = new User({
        name: 'jojo',
        email: 'jojo@gmail.com',
        phone: 9876543210,
        password: hashedPassword,
        role: 'Employer'
      });

      await jojoUser.save();
      console.log('Created employer user: jojo');
    } else {
      console.log('Employer jojo already exists');
    }

    // Get the user ID
    const employer = await User.findOne({ email: 'jojo@gmail.com' });
    
    // Sample jobs data
    const sampleJobs = [
      {
        title: 'Senior Frontend Developer',
        description: 'We are looking for an experienced Frontend Developer to join our team. You will be responsible for building responsive web applications using React, TypeScript, and modern CSS frameworks.',
        category: 'Web Development',
        country: 'United States',
        city: 'San Francisco',
        location: 'San Francisco, CA, United States',
        fixedSalary: 120000,
        postedBy: employer._id
      },
      {
        title: 'Full Stack Engineer',
        description: 'Join our dynamic team as a Full Stack Engineer. You will work on both frontend and backend applications, using Node.js, React, and MongoDB to build scalable solutions.',
        category: 'Full Stack',
        country: 'United States',
        city: 'New York',
        location: 'New York, NY, United States',
        fixedSalary: 135000,
        postedBy: employer._id
      },
      {
        title: 'React Native Developer',
        description: 'We need a skilled React Native Developer to build cross-platform mobile applications. Experience with iOS and Android development required.',
        category: 'Mobile Development',
        country: 'United States',
        city: 'Austin',
        location: 'Austin, TX, United States',
        fixedSalary: 110000,
        postedBy: employer._id
      },
      {
        title: 'Backend Developer',
        description: 'Seeking an experienced Backend Developer to design and implement server-side logic, APIs, and database architecture. Strong knowledge of Node.js and Python required.',
        category: 'Backend Development',
        country: 'United States',
        city: 'Seattle',
        location: 'Seattle, WA, United States',
        fixedSalary: 125000,
        postedBy: employer._id
      },
      {
        title: 'DevOps Engineer',
        description: 'Looking for a DevOps Engineer to manage cloud infrastructure, CI/CD pipelines, and deployment automation. Experience with AWS, Docker, and Kubernetes required.',
        category: 'DevOps',
        country: 'United States',
        city: 'Denver',
        location: 'Denver, CO, United States',
        fixedSalary: 130000,
        postedBy: employer._id
      },
      {
        title: 'UI/UX Designer',
        description: 'We need a creative UI/UX Designer to design user interfaces and experiences for our web and mobile applications. Proficiency in Figma and Adobe Creative Suite required.',
        category: 'Design',
        country: 'United States',
        city: 'Los Angeles',
        location: 'Los Angeles, CA, United States',
        fixedSalary: 95000,
        postedBy: employer._id
      },
      {
        title: 'Data Scientist',
        description: 'Join our data science team to analyze complex datasets, build machine learning models, and provide insights to drive business decisions.',
        category: 'Data Science',
        country: 'United States',
        city: 'Boston',
        location: 'Boston, MA, United States',
        fixedSalary: 140000,
        postedBy: employer._id
      },
      {
        title: 'Product Manager',
        description: 'Seeking an experienced Product Manager to lead product development, coordinate with engineering teams, and drive product strategy.',
        category: 'Management',
        country: 'United States',
        city: 'Chicago',
        location: 'Chicago, IL, United States',
        fixedSalary: 115000,
        postedBy: employer._id
      },
      {
        title: 'QA Engineer',
        description: 'We need a QA Engineer to develop and execute test plans, automate testing processes, and ensure software quality across all platforms.',
        category: 'Testing',
        country: 'United States',
        city: 'Miami',
        location: 'Miami, FL, United States',
        fixedSalary: 85000,
        postedBy: employer._id
      },
      {
        title: 'Machine Learning Engineer',
        description: 'Looking for a Machine Learning Engineer to build and deploy ML models, work with large datasets, and implement AI solutions.',
        category: 'Machine Learning',
        country: 'United States',
        city: 'San Jose',
        location: 'San Jose, CA, United States',
        fixedSalary: 150000,
        postedBy: employer._id
      }
    ];

    // Clear existing jobs by jojo (if any)
    await Job.deleteMany({ postedBy: employer._id });
    console.log('Cleared existing jobs by jojo');

    // Create new jobs
    const createdJobs = await Job.insertMany(sampleJobs);
    console.log(`Created ${createdJobs.length} sample jobs by jojo`);

    // Display created jobs
    createdJobs.forEach((job, index) => {
      console.log(`${index + 1}. ${job.title} - $${job.fixedSalary.toLocaleString()}`);
    });

    console.log('\nSample data creation completed!');
    console.log('Login credentials for jojo:');
    console.log('Email: jojo@gmail.com');
    console.log('Password: password123');

  } catch (error) {
    console.error('Error creating sample data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the function
createSampleData();
