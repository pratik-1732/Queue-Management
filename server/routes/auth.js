import express from "express";
import loginController from "../controllers/loginController.js";
import signupController from "../controllers/signupController.js";
import logoutUser from "../controllers/LogoutController.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signupController);
router.post("/logout", logoutUser);

export default router;
