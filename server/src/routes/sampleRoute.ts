import express from "express";
import sampleController from "../controller/sampleController";
const router = express.Router();
router.post("/add", sampleController);
export default router;
