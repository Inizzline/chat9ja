import express from "express";
import verifyRoute from "../middleware/verifyRoute.js";
import { getUsersForSideBar } from "../controllers/user.js";

const router = express.Router();

router.get("/", verifyRoute, getUsersForSideBar)

export default router;