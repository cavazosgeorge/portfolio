import { useState, useEffect } from "react";

const API_BASE = "/api";

// Types matching our database schema
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  featured: boolean;
  draft: boolean;
  sort_order: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  sort_order: number;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  sort_order: number;
}

export interface SiteSettings {
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
  };
  about: {
    heading: string;
    subheading: string;
    paragraphs: string[];
  };
  contact: {
    heading: string;
    email: string;
    github: string;
    linkedin: string;
  };
}

// Generic fetch hook
function useApi<T>(endpoint: string, fallback: T): { data: T; loading: boolean; error: Error | null; refetch: () => void } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}${endpoint}`);
      if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      // Keep fallback data on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading, error, refetch: fetchData };
}

// Specific hooks for each content type
export function useProjects() {
  return useApi<Project[]>("/projects", []);
}

export function useExperience() {
  return useApi<Experience[]>("/experience", []);
}

export function useSkills() {
  return useApi<Skill[]>("/skills", []);
}

export function useSettings() {
  return useApi<SiteSettings | null>("/settings", null);
}

export function useSetting<K extends keyof SiteSettings>(key: K) {
  return useApi<SiteSettings[K] | null>(`/settings/${key}`, null);
}
