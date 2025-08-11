"use server";
import { api } from "@/lib/axios";
import {
  ApiResponse,
  BlogPost,
  ContactForm,
  Project,
  Service,
  TeamMember,
} from "./types";
import { cache } from "react";

// Blog Actions
export const getAllPosts = cache(async () => {
  const response = await api.get<BlogPost[]>("/blog-posts");
  return response.data || [];
});

export const getPostBySlug = cache(async (slug: string) => {
  const response = await api.get<BlogPost>(`/blog-posts/${slug}`);
  return response.data;
});

export const getRelatedPosts = cache(async (slug: string) => {
  const response = await api.get<BlogPost[]>(`/blog-posts/${slug}/related`);
  return response.data;
});

// Contact Actions
export const submitContact = async (data: ContactForm) => {
  const response = await api.post<ApiResponse>("/contact", data);
  return response.data;
};

export const getContact = cache(async () => {
  const response = await api.get<ApiResponse>("/contact");
  return response.data;
});

// Project Actions
export const getAllProjects = cache(async () => {
  const response = await api.get<Project[]>("/projects");
  return response.data || [];
});

export const getProjectBySlug = cache(async (slug: string) => {
  const response = await api.get<Project>(`/projects/${slug}`);
  return response.data;
});

export const getRelatedProjects = cache(async (slug: string) => {
  const response = await api.get<Project[]>(`/services/${slug}/projects`);
  return response.data || [];
});

export const submitProject = async (data: Partial<Project>) => {
  const response = await api.post<ApiResponse>("/projects", data);
  return response.data;
};

// Service Actions
export const getAllServices = cache(async () => {
  const response = await api.get<Service[]>("/services");
  return response.data || [];
});

export const getServiceBySlug = cache(async (slug: string) => {
  const response = await api.get<Service>(`/services/${slug}`);
  return response.data;
});

export const createService = async (data: Partial<Service>) => {
  const response = await api.post<ApiResponse>("/services", data);
  return response.data;
};

export const updateService = async (slug: string, data: Partial<Service>) => {
  const response = await api.put<ApiResponse>(`/services/${slug}`, data);
  return response.data;
};

export const deleteService = async (id: string) => {
  const response = await api.delete<ApiResponse>(`/services/${id}`);
  return response.data;
};

// Team Actions
export const getAllTeamMembers = cache(async () => {
  const response = await api.get<TeamMember[]>("/team");
  return response.data || [];
});

export const createTeamMember = async (data: TeamMember) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("role", data.role);
  formData.append("bio", data.bio);
  if (data.image instanceof File) {
    formData.append("image", data.image);
  }

  const response = await api.post<ApiResponse>("/team", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateTeamMember = async (
  id: number,
  data: Partial<TeamMember>
) => {
  const formData = new FormData();
  formData.append("id", id.toString());

  if (data.name) formData.append("name", data.name);
  if (data.role) formData.append("role", data.role);
  if (data.bio) formData.append("bio", data.bio);
  if (data.image instanceof File) {
    formData.append("image", data.image);
  }

  const response = await api.post<ApiResponse>("/team", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
  return response.data;
};

export const deleteTeamMember = async (id: number) => {
  const response = await api.delete<ApiResponse>(`/team/${id}`);
  return response.data;
};
