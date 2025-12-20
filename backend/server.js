import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/connect-db.js";
import applicationsRoutes from "./routes/applications.routes.js";
import clientsRoutes from "./routes/clients.auth.routes.js";
import adminsRoutes from "./routes/admins.auth.routes.js";
import statsRoutes from "./routes/stats.routes.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ["http://localhost:3000", "http://127.0.0.1:3001", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/applications", applicationsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/admins", adminsRoutes);
app.use("/api/stats", statsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
