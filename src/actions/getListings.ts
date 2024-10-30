import { Listing } from "@prisma/client";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function getListings(): Promise<Listing[]> {
    const url = new URL(`${BASE_URL}/api/listings`);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch listings");
        }

        const listings: Listing[] = await response.json();

        return listings;
    } catch (error: any) {
        console.warn("Error fetching listings (action)", error);
        return [];
    }
}