import { Router } from "express";
import { userLogin, userSignup } from "../controllers/authController.js";

const router = Router();

// handle signup
router.post("/signup", userSignup);

// handle login
router.post("/login", userLogin);

export default router;
