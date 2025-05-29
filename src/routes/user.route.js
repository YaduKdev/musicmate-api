import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("User Route with GET Method.");
});

export default userRouter;
