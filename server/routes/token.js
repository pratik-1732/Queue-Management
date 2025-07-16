import express from "express";
import getTokens from "../controllers/tokenControllers/getTokens.js";
import addToken from "../controllers/tokenControllers/addToken.js";
import moveUp from "../controllers/tokenControllers/moveUp.js";
import moveDown from "../controllers/tokenControllers/moveDown.js";

const router = express.Router();

router.get("/:queueId", getTokens);
router.post("/:queueId", addToken);

router.put("/:id/moveUp", moveUp);
router.put("/:id/moveDown", moveDown);

export default router;
