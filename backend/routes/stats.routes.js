import express from "express";
import { getStats } from "../controllers/stats.controller.js";
import { verifyToken } from "../middlewares/verify-token.js";
import { isAdmin } from "../middlewares/is-admin.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, getStats);

export default router;