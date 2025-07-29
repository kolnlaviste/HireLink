import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import companiesRoutes from "./routes/companies";
import jobRoutes from "./routes/jobs";
import applicationRoutes from "./routes/applications";
import userRoutes from "./routes/users";

const app = express();
const prisma = new PrismaClient();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/companies", companiesRoutes);
app.use("/jobs", jobRoutes);
app.use("/applications", applicationRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("HireLink API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
