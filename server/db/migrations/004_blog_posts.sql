-- Blog posts table
CREATE TABLE blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT NOT NULL DEFAULT '[]',
  featured INTEGER DEFAULT 0,
  draft INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  published_at TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for common queries
CREATE INDEX idx_blog_posts_draft ON blog_posts(draft);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_sort ON blog_posts(sort_order);
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at);
