-- Contact form submissions
CREATE TABLE contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_read ON contact_messages(read);
CREATE INDEX idx_messages_created ON contact_messages(created_at DESC);
