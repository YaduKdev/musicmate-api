import { Router } from "express";
import { getAdmin } from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.get("/", getAdmin);

export default adminRouter;
