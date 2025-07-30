import express from "express";
import prisma from "../prismaClient";
import { authenticateToken, authorizeRoles } from "../middleware/auth";

const router = express.Router();

/**
 * CREATE Company (Protected)
 * Owner is taken from JWT instead of request body
 */
router.post("/",authenticateToken,authorizeRoles("employer", "admin"), async (req, res) => {
    const { name, logo, location, website, ownerId } = req.body;

    if (!name || !ownerId) {
      return res.status(400).json({ error: "Name and ownerId are required" });
    }

    try {
      const company = await prisma.company.create({
        data: { name, logo, location, website, ownerId },
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
        owner: true,
        jobs: true,
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
 * UPDATE Company (Protected)
 * Only allow logged-in owner to update
 */
router.put("/:id", authenticateToken, async (req, res) => {
  const companyId = parseInt(req.params.id);
  const { name, logo, location, website } = req.body;
  const userId = (req as any).user.id;

  if (isNaN(companyId)) return res.status(400).json({ error: "Invalid ID" });

  try {
    const company = await prisma.company.findUnique({ where: { id: companyId } });
    if (!company) return res.status(404).json({ error: "Company not found" });
    if (company.ownerId !== userId) return res.status(403).json({ error: "Not authorized" });

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
 * DELETE Company (Protected)
 * Only allow logged-in owner to delete
 */
router.delete("/:id", authenticateToken, async (req, res) => {
  const companyId = parseInt(req.params.id);
  const userId = (req as any).user.id;

  if (isNaN(companyId)) return res.status(400).json({ error: "Invalid ID" });

  try {
    const company = await prisma.company.findUnique({ where: { id: companyId } });
    if (!company) return res.status(404).json({ error: "Company not found" });
    if (company.ownerId !== userId) return res.status(403).json({ error: "Not authorized" });

    await prisma.company.delete({ where: { id: companyId } });
    res.json({ message: "Company deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete company" });
  }
});

export default router;
