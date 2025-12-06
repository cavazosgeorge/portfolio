export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "solar-system",
    title: "Solar System",
    description:
      "Interactive 3D visualization of our solar system built with React Three Fiber. Features realistic orbital mechanics, planet selection, and smooth camera controls.",
    tags: ["React", "Three.js", "TypeScript", "WebGL"],
    featured: true,
  },
  {
    id: "brain-board",
    title: "Brain Board",
    description:
      "A visual thinking and image organization tool with drag-and-drop collections, lightbox viewing, and a warm, intuitive interface.",
    tags: ["React", "TypeScript", "Express", "SQLite"],
    featured: true,
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    description:
      "A surreal, motion-driven portfolio featuring magnetic text effects, morphing backgrounds, and smooth scroll-triggered animations.",
    tags: ["React", "Framer Motion", "TypeScript", "Chakra UI"],
    featured: false,
  },
];

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies?: string[];
}

export const experience: Experience[] = [
  {
    id: "current",
    role: "Software Developer",
    company: "Your Company",
    period: "2023 - Present",
    description:
      "Building modern web applications with React, TypeScript, and cloud technologies.",
    technologies: ["React", "TypeScript", "Node.js", "AWS"],
  },
  // Add more experience entries as needed
];

export const skills = [
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Three.js", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Docker", category: "devops" },
  { name: "AWS", category: "devops" },
  { name: "Git", category: "devops" },
];
