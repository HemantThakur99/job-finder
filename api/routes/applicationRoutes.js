import express from "express";
import * as applicationController from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Application API root. Available routes: /post, /employer/getall, /jobseeker/getall, /delete/:id, /:id/resume, /:id/status, /:id",
  });
});

router.post("/post", isAuthenticated, applicationController.postApplication);
router.get("/employer/getall", isAuthenticated, applicationController.employerGetAllApplications);
router.get("/jobseeker/getall", isAuthenticated, applicationController.jobseekerGetAllApplications);
router.delete("/delete/:id", isAuthenticated, applicationController.jobseekerDeleteApplication);

// Download resume (returns URL or redirects when ?redirect=true)
router.get("/:id/resume", isAuthenticated, applicationController.downloadResume);

// Employer/Admin updates application status
router.put("/:id/status", isAuthenticated, applicationController.updateApplicationStatus);

// Get single application
router.get("/:id", isAuthenticated, applicationController.getApplicationById);

export default router;
