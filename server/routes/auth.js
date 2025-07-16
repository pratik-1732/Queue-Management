import express from "express";
import loginController from "../controllers/loginController.js";
import signupController from "../controllers/signupController.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signupController);

export default router;
