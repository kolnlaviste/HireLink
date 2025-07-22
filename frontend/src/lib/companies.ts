// src/lib/companies.ts

export type Company = {
  id: string;
  name: string;
  slug: string;
  description: string;
  location: string;
  website: string;
  logo: string;
  industry: string;
};

export const companies: Company[] = [
  {
    id: "elinnov",
    name: "Elinnov Technologies",
    slug: 'elinnov-technologies',
    description:
      "Elinnov Technologies is a digital solutions provider specializing in web development, cloud services, and enterprise software.",
    location: "Manila, Philippines",
    website: "https://elinnovtech.com",
    logo: "/logos/Elinnov.jpeg", // ✅ CORRECT path
    industry: "Information Technology",
  },
  {
    id: "shoppable",
    name: "Shoppable Business",
    slug: 'shoppable-business',
    description:
      "Shoppable Business is a B2B tech startup building modern infrastructure for digital commerce and business procurement.",
    location: "Manila, Philippines",
    website: "https://shoppable.business",
    logo: "/logos/Shoppable.png", // ✅ CORRECT path
    industry: "E-Commerce / B2B Tech",
  },
];
