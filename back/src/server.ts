import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/usersRouter";
import appointmentRouter from "./routes/appointmentsRouter"; // Asegúrate de usar un nombre coherente

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.local" });
} else {
  dotenv.config();
}

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Rutas
app.use("/users", userRouter);
app.use("/appointments", appointmentRouter);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
export default app;
