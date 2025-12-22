-- Add draft column to projects table
ALTER TABLE projects ADD COLUMN draft INTEGER DEFAULT 0;
