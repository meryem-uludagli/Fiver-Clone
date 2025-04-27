import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import gigRouter from "./routes/gig.routes.ts";
import authRouter from "./routes/auth.routes.ts";

dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("👍🏾veritabani ile baglanti kur"))
  .catch((err) => console.log("👎🏾verirabani baglanamadi"));
const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT}. port dinlemde💊`);
});
