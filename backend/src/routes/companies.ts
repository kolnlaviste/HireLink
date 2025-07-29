import express from "express";
import prisma from "../prismaClient";

const router = express.Router();

/**
 * CREATE Company
 */
router.post("/", async (req, res) => {
  const { name, logo, location, website, ownerId } = req.body;

  if (!name || !ownerId) {
    return res.status(400).json({ error: "Name and ownerId are required" });
  }

  try {
    const company = await prisma.company.create({
      data: {
        name,
        logo,
        location,
        website,
        ownerId,
      },
    });
    res.status(201).json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create company" });
  }
});

/**
 * GET All Companies
 */
router.get("/", async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      include: {
        owner: true, // include user info of owner
        jobs: true,  // include related jobs
      },
    });
    res.json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
});

/**
 * GET Single Company
 */
router.get("/:id", async (req, res) => {
  const companyId = parseInt(req.params.id);
  if (isNaN(companyId)) return res.status(400).json({ error: "Invalid ID" });

  try {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: { owner: true, jobs: true },
    });

    if (!company) return res.status(404).json({ error: "Company not found" });
    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch company" });
  }
});

/**
 * UPDATE Company
 */
router.put("/:id", async (req, res) => {
  const companyId = parseInt(req.params.id);
  const { name, logo, location, website } = req.body;

  if (isNaN(companyId)) return res.status(400).json({ error: "Invalid ID" });

  try {
    const updatedCompany = await prisma.company.update({
      where: { id: companyId },
      data: { name, logo, location, website },
    });
    res.json(updatedCompany);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update company" });
  }
});

/**
 * DELETE Company
 */
router.delete("/:id", async (req, res) => {
  const companyId = parseInt(req.params.id);

  if (isNaN(companyId)) return res.status(400).json({ error: "Invalid ID" });

  try {
    await prisma.company.delete({ where: { id: companyId } });
    res.json({ message: "Company deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete company" });
  }
});

export default router;
