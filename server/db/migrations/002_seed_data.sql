-- Seed initial site settings
INSERT INTO site_settings (key, value) VALUES
  ('hero', '{"title":"George Cavazos","subtitle":"Software Developer","tagline":"Building digital experiences that blend creativity with clean code. Crafting interfaces that feel alive."}'),
  ('about', '{"heading":"Building at the intersection of","subheading":"creativity and code","paragraphs":["I''m a software developer who believes that great code should feel as good as it works. I specialize in building web applications that are both technically robust and genuinely delightful to use.","When I''m not coding, you''ll find me exploring new technologies, contributing to open source, or experimenting with creative coding projects that push the boundaries of what''s possible in the browser."]}'),
  ('contact', '{"heading":"Get in Touch","email":"","github":"","linkedin":""}');

-- Seed projects from current data
INSERT INTO projects (id, title, description, tags, link, featured, sort_order) VALUES
  ('solar-system', 'Solar System', 'Interactive 3D visualization of our solar system built with React Three Fiber. Features realistic orbital mechanics, planet selection, and smooth camera controls.', '["React", "Three.js", "TypeScript", "WebGL"]', 'https://solar-system.cavazosgeorge.com', 1, 1),
  ('brain-board', 'Brain Board', 'A visual thinking and image organization tool with drag-and-drop collections, lightbox viewing, and a warm, intuitive interface.', '["React", "TypeScript", "Express", "SQLite"]', 'https://brain-board.cavazosgeorge.com', 1, 2),
  ('portfolio', 'This Portfolio', 'A surreal, motion-driven portfolio featuring magnetic text effects, morphing backgrounds, and smooth scroll-triggered animations.', '["React", "Framer Motion", "TypeScript", "Chakra UI"]', NULL, 0, 3);

-- Seed experience
INSERT INTO experience (id, role, company, period, description, technologies, sort_order) VALUES
  ('pfizer', 'Systems Engineer - Automation Infrastructure', 'Pfizer, Inc.', 'Oct 2022 - Present', 'Designing and developing comprehensive automation applications featuring interactive web-based dashboards and real-time data visualization. Building custom Grafana dashboards for system monitoring, establishing CI/CD pipelines with GitLab, and integrating live time-series data into user interfaces for data-driven decision making.', '["React", "TypeScript", "Grafana", "Docker", "Kubernetes", "GitLab CI/CD", "PostgreSQL", "RHEL"]', 1),
  ('coderheroes', 'Full Stack Developer - Internship', 'Coderheroes', 'Apr 2022 - Aug 2022', 'Served as a backend engineering team member responsible for debugging server-side code and implementing new features. Designed user authorization and authentication systems, developed RESTful APIs with full CRUD functionality, and contributed to code reviews ensuring quality and alignment with business requirements.', '["Node.js", "REST APIs", "Authentication", "Git"]', 2),
  ('bloomtech', 'Full-Stack Web Development Graduate', 'BloomTech (FKA Lambda School)', 'May 2021 - Apr 2022', 'Completed intensive full-time program in full-stack web development, gaining hands-on experience with modern web technologies, agile methodologies, and collaborative software development practices.', '["JavaScript", "React", "Node.js", "SQL"]', 3);

-- Seed skills
INSERT INTO skills (name, category, sort_order) VALUES
  ('React', 'frontend', 1),
  ('TypeScript', 'frontend', 2),
  ('JavaScript', 'frontend', 3),
  ('HTML/CSS', 'frontend', 4),
  ('Grafana', 'frontend', 5),
  ('Node.js', 'backend', 1),
  ('PostgreSQL', 'backend', 2),
  ('SQL', 'backend', 3),
  ('REST APIs', 'backend', 4),
  ('Docker', 'devops', 1),
  ('Kubernetes', 'devops', 2),
  ('GitLab CI/CD', 'devops', 3),
  ('Linux/RHEL', 'devops', 4),
  ('Git', 'devops', 5);
