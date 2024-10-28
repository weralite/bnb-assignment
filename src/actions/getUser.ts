"use server";

import { SafeUser } from "@/types/user";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function getUser(token: string): Promise<SafeUser> {
  const response = await fetch(`${BASE_URL}/api/users/me/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    console.error("Error fetching user:", data.message); // Log the error message
    throw new Error(data.message || "Failed to fetch user");
  }

  const data = await response.json();
  return data;
}