import "express-async-errors";
import express from "express";
import { connectDB } from "./db/connect.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.js";
import { notFoundMiddleware } from "./middlewares/notFound.js";
import { authenticationMiddleware } from "./middlewares/auth.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import journalRouter from "./routes/journalRoutes.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./public")));

app.use("/api/v1/users", authenticationMiddleware, userRouter);
app.use("/api/v1/journal", authenticationMiddleware, journalRouter);
app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use("*", notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;
try {
  await connectDB();
  app.listen(port, () => console.log(`server is running on port ${port}`));
} catch (error) {
  console.log(error);
  process.exit(1);
}
