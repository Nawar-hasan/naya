import axios from "axios";

// Create axios instance with default config
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
    Auth_ACCESS_TOKEN: process.env.Auth_ACCESS_TOKEN,
  },
});
