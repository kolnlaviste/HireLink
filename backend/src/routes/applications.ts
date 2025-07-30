import express from "express";
import prisma from "../prismaClient";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

// GET all applications (optional: make this admin-only)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      include: { job: true, applicant: true },
    });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// GET application by ID
router.get("/:id", authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const application = await prisma.application.findUnique({
      where: { id },
      include: { job: true, applicant: true },
    });

    if (!application) return res.status(404).json({ error: "Application not found" });

    // Only allow owner (applicant) or admin
    const user = (req as any).user;
    if (application.applicantId !== user.id && user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.json(application);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch application" });
  }
});

// CREATE application (Protected)
router.post("/", authenticateToken, async (req, res) => {
  const { jobId, status } = req.body;
  const applicantId = (req as any).user.id; // From JWT

  if (!jobId) {
    return res.status(400).json({ error: "Job ID is required" });
  }

  try {
    // Check if job exists
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ error: "Job not found" });

    const application = await prisma.application.create({
      data: {
        jobId,
        applicantId,
        status: status || "PENDING",
      },
    });
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: "Failed to create application" });
  }
});

// UPDATE application status (Protected)
router.put("/:id", authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const user = (req as any).user;

  try {
    const application = await prisma.application.findUnique({ where: { id } });
    if (!application) return res.status(404).json({ error: "Application not found" });

    // Only applicant or admin can update
    if (application.applicantId !== user.id && user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { status },
    });
    res.json(updatedApplication);
  } catch (err) {
    res.status(500).json({ error: "Failed to update application" });
  }
});

// DELETE application (Protected)
router.delete("/:id", authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const user = (req as any).user;

  try {
    const application = await prisma.application.findUnique({ where: { id } });
    if (!application) return res.status(404).json({ error: "Application not found" });

    // Only applicant or admin can delete
    if (application.applicantId !== user.id && user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    await prisma.application.delete({ where: { id } });
    res.json({ message: "Application deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete application" });
  }
});

export default router;
