import express from "express";
import dotenv from "dotenv";

// db
import { connectDb } from "./lib/db.js";

// Routes
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import adminRouter from "./routes/admin.route.js";
import songsRouter from "./routes/songs.route.js";
import albumsRouter from "./routes/albums.route.js";
import statsRouter from "./routes/stats.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/songs", songsRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/stats", statsRouter);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
  connectDb;
});
