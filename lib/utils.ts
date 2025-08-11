import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getAllEncodedCategories = (articles: { category: string }[]) => {
  return [
    "All",
    ...new Set(articles.map((art) => encodeURIComponent(art.category))),
  ];
};
export const getAllDecodedCategories = (articles: { category: string }[]) => {
  return [
    "All",
    ...new Set(articles.map((art) => decodeURIComponent(art.category))),
  ];
};
