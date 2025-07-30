import express from "express";
import prisma from "../prismaClient";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: { company: true, postedBy: true, applications: true },
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// GET job by ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const job = await prisma.job.findUnique({
      where: { id },
      include: { company: true, postedBy: true, applications: true },
    });

    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

// CREATE job (Protected)
router.post("/", authenticateToken, async (req, res) => {
  const { title, description, companyId } = req.body;
  const postedById = (req as any).user.id; // Get from JWT

  if (!title || !description || !companyId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Optional: Check if company exists
    const company = await prisma.company.findUnique({ where: { id: companyId } });
    if (!company) return res.status(404).json({ error: "Company not found" });

    const job = await prisma.job.create({
      data: { title, description, companyId, postedById },
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to create job" });
  }
});

// UPDATE job (Protected)
router.put("/:id", authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;
  const userId = (req as any).user.id;

  try {
    // Ensure user owns this job
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) return res.status(404).json({ error: "Job not found" });
    if (job.postedById !== userId) return res.status(403).json({ error: "Not authorized" });

    const updatedJob = await prisma.job.update({
      where: { id },
      data: { title, description },
    });
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: "Failed to update job" });
  }
});

// DELETE job (Protected)
router.delete("/:id", authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const userId = (req as any).user.id;

  try {
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) return res.status(404).json({ error: "Job not found" });
    if (job.postedById !== userId) return res.status(403).json({ error: "Not authorized" });

    await prisma.job.delete({ where: { id } });
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete job" });
  }
});

export default router;
