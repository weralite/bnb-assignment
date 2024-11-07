import CookieKit from "@/utils/cookieKit";
import { Listing } from "@prisma/client";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function deleteListing(id: string): Promise<Listing> {
    const url = new URL(`${BASE_URL}/api/listings/${id}`);  
    const token = CookieKit.get("token");

    if (!token) {
        console.warn("No authentication token found.");
        throw new Error("No authentication token found.");
    }

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error("Unable to perform task")
        }

        return await response.json();
    } catch (error: any) {
        console.warn("Error (action)", error);
        throw new Error("Error (action)");
    }

}
