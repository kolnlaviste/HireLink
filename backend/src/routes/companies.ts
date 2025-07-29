import express from "express";
const router = express.Router();

// Example GET route - list companies
router.get("/", (req, res) => {
  res.json({ message: "List of companies" });
});

// Example POST route - create company
router.post("/", (req, res) => {
  res.json({ message: "Create a company" });
});

export default router;
