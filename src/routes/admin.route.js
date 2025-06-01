import { Router } from "express";
import { createSong } from "../controllers/admin.controller.js";
import { checkAdmin, protectRoute } from "../middlewares/auth.middleware.js";

const adminRouter = Router();

adminRouter.post("/songs", protectRoute, checkAdmin, createSong);

export default adminRouter;
