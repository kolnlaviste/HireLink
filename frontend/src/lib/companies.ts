// lib/companies.ts

export type Company = {
  id: string;
  name: string;
  description: string;
  location: string;
  website: string;
  logoUrl: string;
  industry: string;
};

export const companies: Company[] = [
  {
    id: "elinnov",
    name: "Elinnov Technologies",
    description:
      "Elinnov Technologies is a digital solutions provider specializing in web development, cloud services, and enterprise software.",
    location: "Cebu City, Philippines",
    website: "https://elinnovtech.com",
    logoUrl: "../public/logos/elinnov.jpeg", 
    industry: "Information Technology",
  },
  {
    id: "shoppable",
    name: "Shoppable Business",
    description:
      "Shoppable Business is a B2B tech startup building modern infrastructure for digital commerce and business procurement.",
    location: "Manila, Philippines",
    website: "https://shoppable.business", 
    logoUrl: "../public/logos/shoppable.png", 
    industry: "E-Commerce / B2B Tech",
  },
];
