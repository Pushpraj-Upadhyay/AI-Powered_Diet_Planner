import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { createMealPlan } from "../controllers/mealPlanController.js";
import { fetchMealPlan } from "../controllers/fetchPlanController.js";

const router = express.Router();

// create meal plan
router.post("/create", verifyToken, createMealPlan);

// fetch meal plan
router.post("/suggestions", verifyToken, fetchMealPlan);

export default router;
