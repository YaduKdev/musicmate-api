import { Router } from "express";
import {
  verifyAdmin,
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
} from "../controllers/admin.controller.js";
import { checkAdmin, protectRoute } from "../middlewares/auth.middleware.js";

const adminRouter = Router();

adminRouter.use(protectRoute, checkAdmin);

adminRouter.get("/verify", verifyAdmin);
adminRouter.post("/songs", createSong);
adminRouter.delete("/songs/:id", deleteSong);
adminRouter.post("/albums", createAlbum);
adminRouter.delete("/albums/:id", deleteAlbum);

export default adminRouter;
