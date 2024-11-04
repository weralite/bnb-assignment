"use server";

import { SafeUser } from "@/types/user";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function getUser(token: string): Promise<{ success: boolean; data?: SafeUser }> {
  try {
    const response = await fetch(`${BASE_URL}/api/users/me/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`Error fetching user: Status ${response.status}`);
      return { success: false }; 
    }

    const data = await response.json();
    return { success: true, data }; 

  } catch (error) {
    console.error("Network or server error occurred:", error);
    return { success: false };
  }
}
