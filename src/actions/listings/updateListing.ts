import CookieKit from "@/utils/cookieKit";
import { toISODateTime } from "@/utils/dateConverter";
import { Listing } from "@prisma/client";
import { th } from "date-fns/locale";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";



export async function updateListing(id: string, formData: FormData): Promise<Listing | null> {
    const url = new URL(`${BASE_URL}/api/listings/${id}`);

    const token = CookieKit.get('token');

    if (!token) {
        console.warn("No authentication token found.");
        throw new Error("No authentication token found.");
    }

    const listingData = {
        title: formData.get("title"),
        description: formData.get("description"),
        address: formData.get("address"),
        country: formData.get("country"),
        imageUrl: formData.get("imageUrl"),
        dailyRate: parseFloat(formData.get("dailyRate") as string),
        availableBeds: parseInt(formData.get("availableBeds") as string, 10),
        availableFrom: toISODateTime(formData.get("availableFrom") as string),
        availableTo: toISODateTime(formData.get("availableTo") as string),
    };

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(listingData),
        });

        if (!response.ok) {
            throw new Error("Unable to update listing");
        }

        return await response.json();
    } catch (error: any) {
        console.warn("Error updating listing (action)", error);
        throw new Error("Error updating listing (action)");
    }
}
