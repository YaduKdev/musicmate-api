import { Router } from "express";

const songsRouter = Router();

songsRouter.get("/", (req, res) => {
  res.send("Songs Route with GET Method");
});

export default songsRouter;
