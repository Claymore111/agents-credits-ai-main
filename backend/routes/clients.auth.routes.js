import express from "express";
import { registerClient, loginClient, logoutClient, getClient, getAllClients } from "../controllers/clients.auth.controller.js";
import { verifyToken } from "../middlewares/verify-token.js";

const router = express.Router();

router.post("/register", registerClient);
router.post("/login", loginClient);
router.post("/logout", logoutClient);
router.get("/me", verifyToken, getClient);
router.get("/clients", getAllClients);


export default router;