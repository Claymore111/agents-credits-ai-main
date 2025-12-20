import express from "express";
import { createApplication , getClientApplications , getApplicationById} from "../controllers/applications.controller.js";
import { verifyToken } from "../middlewares/verify-token.js";
import { isAdmin } from "../middlewares/is-admin.js";

const router = express.Router();

router.post("/", verifyToken, createApplication);

router.get("/", verifyToken, isAdmin, getClientApplications);

router.get("/:applicationId", verifyToken, isAdmin, getApplicationById);

export default router;