import { Router } from "express";
import {
  getAllAlbums,
  getAlbumById,
} from "../controllers/albums.controller.js";

const albumsRouter = Router();

albumsRouter.get("/", getAllAlbums);
albumsRouter.get("/:id", getAlbumById);

export default albumsRouter;
