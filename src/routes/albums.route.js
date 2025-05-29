import { Router } from "express";

const albumsRouter = Router();

albumsRouter.get("/", (req, res) => {
  res.send("Albums Route with GET Method");
});

export default albumsRouter;
