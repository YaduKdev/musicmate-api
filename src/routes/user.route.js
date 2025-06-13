import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getAllUsers, getMessages } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", protectRoute, getAllUsers);
userRouter.get("/messages/:userId", protectRoute, getMessages);

export default userRouter;
