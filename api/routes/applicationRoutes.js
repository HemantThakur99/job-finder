import express from "express";
import {
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
  getApplicationById,
  downloadResume,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postApplication);
router.get("/employer/getall", isAuthenticated, employerGetAllApplications);
router.get("/jobseeker/getall", isAuthenticated, jobseekerGetAllApplications);
router.delete("/delete/:id", isAuthenticated, jobseekerDeleteApplication);

// Get single application
router.get("/:id", isAuthenticated, getApplicationById);

// Download resume (returns URL or redirects when ?redirect=true)
router.get("/:id/resume", isAuthenticated, downloadResume);

// Employer/Admin updates application status
router.put("/:id/status", isAuthenticated, updateApplicationStatus);

export default router;
