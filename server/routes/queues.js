import express from "express";
import getQueue from "../controllers/getQueue.js";
import createQueue from "../controllers/createQueue.js";

const router = express.Router();

router.get("/", getQueue);
router.post("/", createQueue);

export default router;