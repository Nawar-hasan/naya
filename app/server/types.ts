// Common Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

// Blog Types
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  image: string;
  excerpt: string;
  read_time: string;
  content: string;
  category: string;
  createdAt: string;
}

// Project Types
export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  video: string;
  link: string;
  service_id: number;
  technologies: string[];
  metrics: {
    increase: string;
    metric: string;
  };
}
type Feature = {
  id: number;
  service_id: string;
  title: string;
  description: string;
  created_at: string | null;
  updated_at: string | null;
};

type Technology = {
  id: number;
  service_id: string;
  name: string;
  created_at: string | null;
  updated_at: string | null;
};
// Service Types
export type Service = {
  id: number;
  slug: string;
  title: string;
  description: string;
  long_description: string;
  image: string;
  expressive_image: string;
  created_at: string | null;
  updated_at: string | null;
  features: Feature[];
  technologies: Technology[];
};

// Contact Types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
// Add Team Types after the Contact Types
export interface TeamMember {
  id?: number;
  name: string;
  role: string;
  bio: string;
  image?: File | string;
}

export interface TeamFormData extends FormData {
  append(name: string, value: string | Blob | File): void;
}
