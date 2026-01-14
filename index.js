import express from "express";
import mongoose from "mongoose";
import userRouter from "./router/userRouter.js";
import productRouter from "./router/productRouter.js";
import authorizeUser from "./lib/jwtMiddleware.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const mongoURL = process.env.MONGO_URI;
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("conected to mpngoDB");
  })
  .catch(() => {
    console.log("error connecting to mongoDB");
  });

const app = express();

app.use(express.json());

app.use(authorizeUser);

app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
