import express from "express";
import mongoose from "mongoose";
const cors = require("cors");
import sampleRouter from "./routes/sampleRoute";
const app = express();
try {
  mongoose.connect("mongodb://localhost:27017/ipfs");
  console.log("DB connceted");
} catch (e) {
  console.log(`Unable.to connect to DB \n Error ${e}`);
}
app.use(cors());
app.use(express.json());
app.use("/", sampleRouter);
app.listen(5000, () => {
  console.log("running at 5000");
});
