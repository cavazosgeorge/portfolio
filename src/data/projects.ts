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
    link: "https://solar-system.cavazosgeorge.com",
    featured: true,
  },
  {
    id: "brain-board",
    title: "Brain Board",
    description:
      "A visual thinking and image organization tool with drag-and-drop collections, lightbox viewing, and a warm, intuitive interface.",
    tags: ["React", "TypeScript", "Express", "SQLite"],
    link: "https://brain-board.cavazosgeorge.com",
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
    id: "pfizer",
    role: "Systems Engineer - Automation Infrastructure",
    company: "Pfizer, Inc.",
    period: "Oct 2022 - Present",
    description:
      "Designing and developing comprehensive automation applications featuring interactive web-based dashboards and real-time data visualization. Building custom Grafana dashboards for system monitoring, establishing CI/CD pipelines with GitLab, and integrating live time-series data into user interfaces for data-driven decision making.",
    technologies: ["React", "TypeScript", "Grafana", "Docker", "Kubernetes", "GitLab CI/CD", "PostgreSQL", "RHEL"],
  },
  {
    id: "coderheroes",
    role: "Full Stack Developer - Internship",
    company: "Coderheroes",
    period: "Apr 2022 - Aug 2022",
    description:
      "Served as a backend engineering team member responsible for debugging server-side code and implementing new features. Designed user authorization and authentication systems, developed RESTful APIs with full CRUD functionality, and contributed to code reviews ensuring quality and alignment with business requirements.",
    technologies: ["Node.js", "REST APIs", "Authentication", "Git"],
  },
  {
    id: "bloomtech",
    role: "Full-Stack Web Development Graduate",
    company: "BloomTech (FKA Lambda School)",
    period: "May 2021 - Apr 2022",
    description:
      "Completed intensive full-time program in full-stack web development, gaining hands-on experience with modern web technologies, agile methodologies, and collaborative software development practices.",
    technologies: ["JavaScript", "React", "Node.js", "SQL"],
  },
];

export const skills = [
  // Frontend & UI
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "HTML/CSS", category: "frontend" },
  { name: "Grafana", category: "frontend" },
  // Backend & Data
  { name: "Node.js", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "SQL", category: "backend" },
  { name: "REST APIs", category: "backend" },
  // DevOps & Infrastructure
  { name: "Docker", category: "devops" },
  { name: "Kubernetes", category: "devops" },
  { name: "GitLab CI/CD", category: "devops" },
  { name: "Linux/RHEL", category: "devops" },
  { name: "Git", category: "devops" },
];
