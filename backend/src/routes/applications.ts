import express from "express";
import prisma from "../prismaClient";

const router = express.Router();

// GET all applications
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const application = await prisma.application.findUnique({
      where: { id },
      include: { job: true, applicant: true },
    });

    if (!application) return res.status(404).json({ error: "Application not found" });
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch application" });
  }
});

// CREATE application
router.post("/", async (req, res) => {
  const { jobId, applicantId, status } = req.body;

  if (!jobId || !applicantId) {
    return res.status(400).json({ error: "Job ID and Applicant ID are required" });
  }

  try {
    const application = await prisma.application.create({
      data: {
        jobId,
        applicantId,
        status: status || "PENDING", // default if not provided
      },
    });
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: "Failed to create application" });
  }
});

// UPDATE application status
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  try {
    const application = await prisma.application.update({
      where: { id },
      data: { status },
    });
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: "Failed to update application" });
  }
});

// DELETE application
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.application.delete({ where: { id } });
    res.json({ message: "Application deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete application" });
  }
});

export default router;
