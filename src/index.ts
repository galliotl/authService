import { dbUrl } from "./config";
import { urlencoded, json } from "body-parser";
import cors from "cors";
import express from "express";
import logger from "morgan";
import mongoose from "mongoose";
import v1 from "./v1";

const app = express();
app.use(cors());
app.use(json());
app.use(logger("dev"));
app.use(urlencoded({ extended: true }));

mongoose.connect(
  dbUrl,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error(err);
    }
    console.log("connected to db");
  }
);

app.use("/v1", v1);

app.listen(5000, () => {
  console.log("server is listeneing");
});
