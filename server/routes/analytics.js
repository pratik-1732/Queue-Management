import express from "express";
import analyticsController from "../controllers/analyticsController.js";

const router= express.Router();

router.get("/queue/:queueId", analyticsController);

export default router;