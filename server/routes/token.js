import express from "express";
import getTokens from "../controllers/tokenControllers/getTokens.js";
import addToken from "../controllers/tokenControllers/addToken.js";
import moveUp from "../controllers/tokenControllers/moveUp.js";
import moveDown from "../controllers/tokenControllers/moveDown.js";

const router = express.Router();

router.get("/:queueId", getTokens);
router.post("/:queueId", addToken);

router.put("/moveUp/:id", moveUp);
router.put("/moveDown/:id", moveDown);

export default router;
