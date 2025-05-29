import { Router } from "express";

const statsRouter = Router();

statsRouter.get("/", (req, res) => {
  res.send("Stats Route with GET Method");
});

export default statsRouter;
