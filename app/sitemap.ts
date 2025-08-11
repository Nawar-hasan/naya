import type { MetadataRoute } from "next";
import { getAllPosts, getAllProjects, getAllServices } from "./server/actions";
import { contactInfo } from "@/constants";
import { getAllEncodedCategories } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/contact",
    "/start-project",
  ];

  // Dynamic routes (e.g., blog posts)
  const services = await getAllServices();
  const blogs = await getAllPosts();
  const portfolios = await getAllProjects();
  const blogCategories = getAllEncodedCategories(blogs);
  const portfolioCategories = getAllEncodedCategories(portfolios);
  // Combine static and dynamic routes
  const allRoutes = [
    ...staticRoutes,
    ...services.map((service) => `/services/${service.slug}`),
    ...blogs.map(
      (blog) => `/insights/${encodeURIComponent(blog.category)}/${blog.slug}`
    ),
    ...blogCategories.map((category) => `/insights/${category}`),
    ...portfolioCategories.map((category) => `/portfolio/${category}`),
  ];

  // Format routes for sitemap
  return allRoutes.map((route) => ({
    url: `${contactInfo.host}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
