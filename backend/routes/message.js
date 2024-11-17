import express from "express";
import { getMessage, sendMessage } from "../controllers/message.js";
import verifyRoute from "../middleware/verifyRoute.js";

const router = express.Router();

router.get("/:id", verifyRoute, getMessage);
router.post("/send/:id", verifyRoute, sendMessage);

export default router