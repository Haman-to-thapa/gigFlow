import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import connectDB from "./config/db";
import authRoutes from "./routes/auth"
import gigRoutes from "./routes/gig";
import bidRoutes from "./routes/bid";
import http from 'http'
import { initSocket } from "./socket";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "GigFlow API is running (TS)" });
});

// routes 
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);



const server = http.createServer(app);

initSocket(server)

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
