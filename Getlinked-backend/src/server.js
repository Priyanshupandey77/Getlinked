import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieparser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js"

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://getlinked-two-psi.vercel.app",
    credentials: true,
  }),
);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

app.use(cookieparser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
