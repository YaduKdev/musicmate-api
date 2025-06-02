import { Router } from "express";
import {
  getAllSongs,
  getFeaturedSongs,
  getSuggestedSongs,
  getTrendingSongs,
} from "../controllers/songs.controller.js";
import { checkAdmin, protectRoute } from "../middlewares/auth.middleware.js";

const songsRouter = Router();

songsRouter.get("/", protectRoute, checkAdmin, getAllSongs);
songsRouter.get("/featured", getFeaturedSongs);
songsRouter.get("/suggested", getSuggestedSongs);
songsRouter.get("/trending", getTrendingSongs);

export default songsRouter;
