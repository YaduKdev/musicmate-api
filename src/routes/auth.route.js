import { Router } from "express";
import { authCallback } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/callback", authCallback);

export default authRouter;
