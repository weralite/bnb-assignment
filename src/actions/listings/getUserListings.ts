import { Listing } from "@prisma/client";

import CookieKit from "@/utils/cookieKit";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function getUserListings(): Promise<Listing[]> {
    const url = new URL(`${BASE_URL}/api/listings`);
    const token = CookieKit.get('token');

    if (!token) {
        console.warn("No authentication token found.");
        return[];
    }

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Unable to fetch listings");
        }

        const listings: Listing[] = await response.json();

        return listings;
    } catch (error: any) {
        console.warn("Error fetching listings (action)", error);
        return[];
    }
}
