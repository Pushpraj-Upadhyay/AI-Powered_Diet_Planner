import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import mealPlanRoutes from "./routes/mealPlanRoutes.js";

dotenv.config();
connectDB();
const app = express();

app.use(
  cors({
    origin: "https://ai-powered-diet-planner.vercel.app", // frontend origin
    credentials: true,
  })
);
app.use(express.json());

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/meal-plan", mealPlanRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});
