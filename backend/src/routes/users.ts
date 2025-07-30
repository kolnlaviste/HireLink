import express from "express";
import prisma from "../prismaClient";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { authenticateToken, authorizeRoles } from "../middleware/auth";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        companies: true,
        applications: true,
        jobs: true,
      },
    });
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE a new user (register)
// CREATE a new user (register)
router.post("/", authenticateToken, authorizeRoles("employer", "admin"), async (req, res) => {
    const { title, description, companyId, postedById } = req.body;

    if (!title || !description || !companyId || !postedById) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const job = await prisma.job.create({
        data: { title, description, companyId, postedById },
      });
      res.status(201).json(job);
    } catch (err) {
      res.status(500).json({ error: "Failed to create job" });
    }
});



// GET single user by ID
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        companies: true,
        applications: true,
        jobs: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid password" });

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to login" });
  }
});

export default router;
