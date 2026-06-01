import express from "express";
import { getOverview, getJobsByCategory } from "../controllers/adminController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get('/overview', isAuthenticated, getOverview);
router.get('/jobs-by-category', isAuthenticated, getJobsByCategory);

export default router;
