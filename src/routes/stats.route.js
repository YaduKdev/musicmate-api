import { Router } from "express";
import { getStats } from "../controllers/stats.controller.js";
import { checkAdmin, protectRoute } from "../middlewares/auth.middleware.js";

const statsRouter = Router();

statsRouter.get("/", protectRoute, checkAdmin, getStats);

export default statsRouter;
