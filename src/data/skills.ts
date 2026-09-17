export type SkillGroup = {
  label: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Redux / Zustand"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "REST & GraphQL APIs", "PostgreSQL", "MongoDB", "Prisma"],
  },
  {
    label: "Business Systems",
    skills: ["ERP Customization", "Workflow Automation", "Odoo", "Internal Tooling", "Process Integration"],
  },
  {
    label: "Delivery",
    skills: ["Docker", "CI/CD", "Git", "Testing", "Client Consulting", "Technical Scoping"],
  },
];

// Flat list used for the marquee band.
export const marqueeSkills = skillGroups.flatMap((g) => g.skills);
