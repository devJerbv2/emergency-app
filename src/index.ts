import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", contactRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Check root endpoint
app.get("/", (req, res) => {
  res.status(200).json({ status: "Running!" });
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
