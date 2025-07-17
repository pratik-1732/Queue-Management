import express from "express";
import getTokens from "../controllers/tokenControllers/getTokens.js";
import addToken from "../controllers/tokenControllers/addToken.js";
import moveUp from "../controllers/tokenControllers/moveUp.js";
import moveDown from "../controllers/tokenControllers/moveDown.js";
import assignToken from "../controllers/tokenControllers/assignToken.js";
import deleteToken from "../controllers/tokenControllers/deleteToken.js";

const router = express.Router();

router.get("/:queueId", getTokens);
router.post("/:queueId", addToken);

router.patch("/move-up/:id", moveUp);
router.patch("/move-down/:id", moveDown);

router.patch("/assign/:id", assignToken);
router.patch("/delete/:id", deleteToken);

export default router;
