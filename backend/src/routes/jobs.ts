import express from "express";
import prisma from "../prismaClient";

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

// CREATE job
router.post("/", async (req, res) => {
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

// UPDATE job
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;

  try {
    const job = await prisma.job.update({
      where: { id },
      data: { title, description },
    });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to update job" });
  }
});

// DELETE job
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.job.delete({ where: { id } });
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete job" });
  }
});

export default router;
