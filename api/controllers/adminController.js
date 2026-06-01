import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { Job } from "../models/jobSchema.js";
import { Application } from "../models/applicationSchema.js";

export const getOverview = catchAsyncErrors(async (req, res, next) => {
  // allow Employer or Admin
  if (req.user.role !== 'Employer' && req.user.role !== 'Admin') {
    return next(new ErrorHandler('Not authorized', 403));
  }

  const totalUsers = await User.countDocuments();
  const totalJobs = await Job.countDocuments();
  const totalApplications = await Application.countDocuments();

  const applicationsByStatus = await Application.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);

  const jobsByCategory = await Job.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } }
  ]);

  const recentApplications = await Application.find().sort({ _id: -1 }).limit(10).select('name email jobInfo status createdAt resume');

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      totalJobs,
      totalApplications,
      applicationsByStatus,
      jobsByCategory,
      recentApplications,
    }
  });
});

export const getJobsByCategory = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role !== 'Employer' && req.user.role !== 'Admin') {
    return next(new ErrorHandler('Not authorized', 403));
  }

  const jobsByCategory = await Job.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } }
  ]);

  res.status(200).json({ success: true, jobsByCategory });
});
