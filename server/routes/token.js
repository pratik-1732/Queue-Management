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

router.put("/moveUp/:id", moveUp);
router.put("/moveDown/:id", moveDown);

router.put("/assign/:id", assignToken);
router.delete("/delete/:id", deleteToken);

export default router;
