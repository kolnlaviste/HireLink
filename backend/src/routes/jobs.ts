import express from "express";
const router = express.Router();

// Example GET route
router.get("/", (req, res) => {
  res.json({ message: "List of jobs" });
});

// Example POST route
router.post("/", (req, res) => {
  res.json({ message: "Create a job" });
});

export default router;
