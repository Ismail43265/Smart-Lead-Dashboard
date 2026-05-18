import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes"
import {notFound, errorHandler} from "./middlewares/error.middleware"

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req,res)=>{
     console.log("GET / route hit");
    res.status(200).json({
        success: true,
        message: "Smart leads dashboard API is running",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;