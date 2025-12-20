import express from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAdmin,
  updateAdmin,
} from "../controllers/admins.auth.controller.js";
import { verifyToken } from "../middlewares/verify-token.js";
import { isAdmin } from "../middlewares/is-admin.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/me", verifyToken, isAdmin, getAdmin);
router.put("/:id", verifyToken, isAdmin, updateAdmin);

export default router;
