import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import { createServer } from "http";
import { initializeSocket } from "./lib/socket.js";
import cron from "node-cron";
import fs from "fs";

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
const VIEW_URI = process.env.VIEW_URI;
const __dirname = path.resolve();

const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(
  cors({
    origin: VIEW_URI,
    credentials: true,
  })
);

app.use(express.json());

// Initialize clerk middleware for auth functions
app.use(clerkMiddleware());

// File Upload Options
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 15 * 1024 * 1024, //15MB
    },
  })
);
//cron jobs - delete tmp files every hour
const tmpDir = path.join(process.cwd(), "tmp");

cron.schedule("0 * * * *", () => {
  if (fs.existsSync(tmpDir)) {
    fs.readdir(tmpDir, (err, files) => {
      if (err) {
        console.log("error", err);
        return;
      }
      for (const file of files) {
        fs.unlink(path.join(tmpDir, file), (err) => {});
      }
    });
  }
});

//Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/songs", songsRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/stats", statsRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../musicmate-view/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../../musicmate-view/dist/index.html")
    );
  });
}

//For Error Handling
app.use((error, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error.message,
  });
});

httpServer.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
  connectDb();
});
